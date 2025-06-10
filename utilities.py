
from datetime import datetime, timedelta
import re
import string
from typing import Dict
from dotenv import load_dotenv
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy import desc
from sqlalchemy.orm import Session

from models.user_contact_model import UserContact
from models.user_model import User
from schemas.user_contact_create import UserContactCreate
from schemas.user_create import UserCreate

import jwt
import os
import pytz

# Load environment variable from the .env file
load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY") # Secret key for JWT tokens
ACCESS_TOKEN_EXP_DELTA = 3 # Token expires after 3 hours
ALGORITHM = "HS256" # Hashing algorithm for JWT tokens

# Scheme to verify the access token
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

"""
Get the latest user id added into the database
"""
async def get_latest_user_id(db: Session):
    user_id = db.query(User.user_id).order_by(desc(User.user_id)).first()

    if user_id is None:
        raise HTTPException(status_code=500, detail="An error has occurred.")
    
    return user_id

"""
Insert a user to the database
"""
async def insert_user(new_user: UserCreate, db: Session):
    current_time = datetime.now()
    current_time = current_time.strftime('%Y-%m-%d %H:%M:%S')

    new_user_model = User(username=new_user.username,
                        password=new_user.password,
                        display_name=new_user.display_name,
                        gender=new_user.gender,
                        dob=new_user.dob,
                        vehicle=new_user.vehicle,
                        created_date=current_time)
    
    db.add(new_user_model)
    db.commit()
    db.refresh(new_user_model)

    return {
        "message": "User added successfully."
    }

"""
Insert a user contact to the database with the corresponding user
"""
async def insert_user_contact(new_user_contact: UserContactCreate, db: Session):
    new_user_contact_model = UserContact(user_id=new_user_contact.user_id,
                                         phone=new_user_contact.phone,
                                         email=new_user_contact.email,
                                         address=new_user_contact.address,
                                         district=new_user_contact.district,
                                         city=new_user_contact.city)
    
    db.add(new_user_contact_model)
    db.commit()
    db.refresh(new_user_contact_model)

    return {
        "message": "User contact added successfully."
    }

"""
Creating an access token for the user
"""
def create_access_token(data: dict):
    # Payload preparation
    payload = data.copy()

    exp_delta = timedelta(hours=ACCESS_TOKEN_EXP_DELTA)
    local_tz = pytz.timezone('Asia/Bangkok')  # For Indochina Time

    now = datetime.now(local_tz).astimezone(pytz.utc)
    iat = now
    exp = iat + exp_delta
    payload.update({
        "iat": iat,
        "exp": exp
    })

    jwt_token = jwt.encode(payload, SECRET_KEY, ALGORITHM)

    return jwt_token

"""
Decode the access token provided by the client
"""
def decode_access_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token has expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")

"""Sanitizing input"""
def sanitize(input: str):
    # Trim the input, remove HTML tags, remove punctuation, and clean spaces
    sanitized_input = re.sub(r'<[^>]*>', '', input.strip())  # Remove HTML tags
    sanitized_input = sanitized_input.translate(str.maketrans('', '', string.punctuation))  # Remove punctuation
    sanitized_input = " ".join(sanitized_input.split())  # Remove extra spaces

    return sanitized_input