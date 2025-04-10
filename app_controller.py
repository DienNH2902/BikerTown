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

# Initialize FastAPI app
app = FastAPI()

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
    user = db.query(User).filter(User.username == username).first()

    if (user is None):
        raise HTTPException(status_code=400, detail="Invalid username or password")
    
    if (user.password != password):
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

    if user:
        raise HTTPException(status_code=400, detail="Username already exists.")
    
    new_user = UserCreate(username=username, password=password, display_name=display_name, gender=gender, dob=datetime.strptime(dob, '%Y-%m-%d').date(), vehicle=vehicle)
    user_insert_result = await utilities.insert_user(new_user, db)

    if (user_insert_result is None):
        raise HTTPException(status_code=500, detail="Failed to add user.")
    
    latest_user_id = await utilities.get_latest_user_id(db)
    latest_user_id = latest_user_id[0]
    
    if latest_user_id is None:
        raise HTTPException(status_code=500, detail="An error has occurred in retrieving data.")
    
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
        "vehicle": result.vehicle,
        "created_date": result.created_date
    }
    
    return response
