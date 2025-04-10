from datetime import datetime
from fastapi import Depends, FastAPI, Form, HTTPException
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from database import Base, get_db, engine
from models.user_model import User
from schemas.user_contact_create import UserContactCreate
from schemas.user_create import UserCreate
from fastapi.middleware.cors import CORSMiddleware
import utilities
import bcrypt

# Initialize FastAPI app
app = FastAPI()

# Create a hash salt for the hashing algorithm
salt = bcrypt.gensalt(rounds=15)

# List of allowed origins
origins = [
    "http://localhost",  # Local frontend (running on a different port)
    "http://localhost:5173",  # Example: React on port 3000  # Example: your production domain
]

# Add CORSMiddleware to allow API calls from the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Specifies which domains can access your API
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Create the tables in the database
Base.metadata.create_all(bind=engine)

"""
Log in endpoint.
"""
@app.post("/login")
async def login(username: str = Form(...), password: str = Form(...), db: Session = Depends(get_db)):
    # Find the matching user with the username given
    user = db.query(User).filter(User.username == username).first()

    # If there is no match, return an error
    if (user is None):
        raise HTTPException(status_code=400, detail="Invalid username or password")

    #Encoding the passwords before feeding into bcrypt    
    password = password.encode('utf-8')
    encoded_user_password = user.password.encode('utf-8') 

    # Checking if the password matches the hashed password
    if not (bcrypt.checkpw(password, encoded_user_password)):
        raise HTTPException(status_code=400, detail="Invalid username or password")

    response = {
        "message": f"Log in successful. Welcome {user.display_name}",
        "username": f"{user.username}"
    }

    return JSONResponse(content = response)

"""
Register endpoint.
"""
@app.post("/register")
async def register(username: str = Form(...),
             password: str = Form(...),
             display_name: str = Form(...),
             gender: bool = Form(...),
             dob: str = Form(...),
             vehicle: str = Form(...),
             phone: str = Form(...),
             email: str = Form(...),
             address: str = Form(...),
             district: str = Form(...),
             city: str = Form(...),
             db: Session = Depends(get_db)):
    user = db.query(User.username).filter(User.username == username).first()

    # Check if the user has already existed on the database
    if user:
        raise HTTPException(status_code=400, detail="Username already exists.")
    
    # If not, create a hash for the new password, add it to the new user and insert the user onto the database
    # Encode the password before feeding into bcrypt
    password = password.encode('utf-8')
    hashed_password = bcrypt.hashpw(password, salt)
    new_user = UserCreate(username=username, 
                          password=hashed_password, 
                          display_name=display_name, 
                          gender=gender, 
                          dob=datetime.strptime(dob, '%Y-%m-%d').date(), 
                          vehicle=vehicle)
    
    user_insert_result = await utilities.insert_user(new_user, db)

    # Check to see if there is any error during inserting the new user
    if (user_insert_result is None):
        raise HTTPException(status_code=500, detail="Failed to add user.")
    
    # Get the latest user_id just added
    latest_user_id = await utilities.get_latest_user_id(db)
    latest_user_id = latest_user_id[0]
    
    # Check to see if there is any error getting the latest user id
    if latest_user_id is None:
        raise HTTPException(status_code=500, detail="An error has occurred in retrieving data.")
    
    # If not, create a new user contact that corresponds to the new user
    new_user_contact = UserContactCreate(user_id = latest_user_id, phone = phone, email = email, address = address, district = district, city = city)
    contact_insert_result = await utilities.insert_user_contact(new_user_contact, db)

    if contact_insert_result is None:
        raise HTTPException(status_code=500, detail="Failed to add contact.")

    return {
        "message": "Register successfully!",
    }
    


# Test endpoint to check the app is working
@app.get("/")
def read_root(db: Session = Depends(get_db)):
    result = db.query(User).filter(User.username == "admin").first()
    

    response = {
        "username": result.username,
        "display_name": result.display_name,
        "gender": result.gender,
        "dob": result.dob,
        # "vehicle": result.vehicle,
    }
    
    return response
