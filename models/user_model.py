from sqlalchemy import Boolean, Column, Date, DateTime, Integer, String
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

    
