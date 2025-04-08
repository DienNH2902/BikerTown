
from datetime import date
from pydantic import BaseModel


class UserCreate(BaseModel):
    user_id: int
    username: str
    password: str
    display_name: str
    gender: bool
    dob: date
    vehicle: str
    

