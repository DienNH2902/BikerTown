
from datetime import date
from pydantic import BaseModel


class UserCreate(BaseModel):
    username: str
    password: str
    display_name: str
    gender: bool
    dob: date
    vehicle: str
    

