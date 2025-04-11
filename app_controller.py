from datetime import datetime
import os
from dotenv import load_dotenv
from fastapi import Depends, FastAPI, Form, HTTPException, requests
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from database import Base, get_db, engine
from models.user_contact_model import UserContact
from models.user_model import User
from schemas.user_contact_create import UserContactCreate
from schemas.user_create import UserCreate
from fastapi.middleware.cors import CORSMiddleware
import utilities
import bcrypt


# Initialize FastAPI app
app = FastAPI()
load_dotenv()

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

# OAuth2PasswordBearer instance
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

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

    data = {
        "user_id": user.user_id,
        "username": user.username,
        "display_name": user.display_name
    }

    access_token = utilities.create_access_token(data)

    response = {
        "message": f"Log in successful. Welcome {user.display_name}",
        "username": f"{user.username}",
        "display_name": f"{user.display_name}",
        "token": access_token,
        "token_type": "bearer"
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
    

@app.get("/profile")
async def get_profile(current_user: dict = Depends(utilities.verify_access_token), db: Session = Depends(get_db)):
    user_profile = db.query(User, UserContact).join(UserContact, User.user_id == UserContact.user_id).filter(User.username == current_user.username).first()
     # If no user or contact found, raise an HTTPException
    if user_profile is None:
        raise HTTPException(status_code=404, detail="User or contact information not found")
    
    user, user_contact = user_profile
    
    return {
        "user": {
            "username": user.username,
            "display_name": user.display_name,
            "gender": user.gender,
            "dob": user.dob,
            "vehicle": user.vehicle,
            "created_date": user.created_date
        },
        "user_contact": {
            "phone": user_contact.phone,
            "email": user_contact.email,
            "address": user_contact.address,
            "district": user_contact.district,
            "city": user_contact.city
        }
    }


"""
Test endpoint to check the app is working
"""
@app.get("/")
def fastapi_test():
    return {
        "message":"Fastapi working."
    }
    

############# MOCK UP SECTION #############
"""
Simulate a login endpoint to provide a token (not for production, only mockup)
"""
@app.post("/token")
async def login_for_access_token(username: str = Form(...), password: str = Form(...)):
    # Fake authentication for demonstration purposes
    if username == "admin" and password == "admin":
        # Create JWT token with user data
        payload = {"sub": username}

        token = utilities.create_access_token(payload)
        return {"access_token": token, "token_type": "bearer"}
    raise HTTPException(status_code=400, detail="Invalid credentials")

"""
Simulate retrieving profile after logged in with JWT verification
"""
@app.get("/mock-profile")
async def get_mock_profile(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    user_profile = db.query(User, UserContact).join(UserContact, User.user_id == UserContact.user_id).filter(User.username == "admin").first()
     # If no user or contact found, raise an HTTPException
    if user_profile is None:
        raise HTTPException(status_code=404, detail="User or contact information not found")
    
    user, user_contact = user_profile
    
    return {
        "user": {
            "username": user.username,
            "display_name": user.display_name,
            "gender": user.gender,
            "dob": user.dob,
            "vehicle": user.vehicle,
            "created_date": user.created_date
        },
        "user_contact": {
            "phone": user_contact.phone,
            "email": user_contact.email,
            "address": user_contact.address,
            "district": user_contact.district,
            "city": user_contact.city
        }
    }