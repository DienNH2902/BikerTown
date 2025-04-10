from pydantic import BaseModel


class UserContactCreate(BaseModel):
    user_id: int
    phone: str
    email: str # replace later with email validator
    address: str
    district: str
    city: str