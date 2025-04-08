from pydantic import BaseModel


class UserContactCreate(BaseModel):
    contact_id: int
    user_id: int
    phone: str
    email: str # replace later with email validator
    address: str
    district: str
    city: str