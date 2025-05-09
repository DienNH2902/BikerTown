from sqlalchemy import Boolean, Column, Date, DateTime, Integer, String
from sqlalchemy.orm import relationship
from database import Base

class User(Base):
    __tablename__ = "user"
    user_id = Column(Integer, primary_key = True, index = True)
    username = Column(String)
    password = Column(String)
    display_name = Column(String)
    gender = Column(Boolean)
    dob = Column(Date)
    vehicle = Column(String)
    created_date = Column(DateTime)

    user_contact = relationship("UserContact", back_populates="user")
    trips = relationship("Trip", back_populates="user")
    
