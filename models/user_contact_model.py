from sqlalchemy import Column, Integer, String
from database import Base


class UserContact(Base):
    __tablename__ = "user_contact"
    contact_id = Column(Integer, primary_key = True, index = True)
    user_id = Column(Integer)
    phone = Column(String)
    email = Column(String)
    address = Column(String)
    district = Column(String)
    city = Column(String)