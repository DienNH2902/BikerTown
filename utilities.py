
from fastapi import HTTPException
from sqlalchemy import desc
from sqlalchemy.orm import Session

from models.user_contact_model import UserContact
from models.user_model import User
from schemas.user_contact_create import UserContactCreate
from schemas.user_create import UserCreate


async def get_latest_user_id(db: Session):
    user_id = db.query(User.user_id).order_by(desc(User.user_id)).first()

    if user_id is None:
        raise HTTPException(status_code=500, detail="An error has occurred.")
    
    return user_id

async def insert_user(new_user: UserCreate, db: Session):
    new_user_model = User(username=new_user.username,
                        password=new_user.password,
                        display_name=new_user.display_name,
                        gender=new_user.gender,
                        dob=new_user.dob,
                        vehicle=new_user.vehicle)
    
    db.add(new_user_model)
    db.commit()
    db.refresh(new_user_model)

    return {
        "message": "User added successfully."
    }

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

    