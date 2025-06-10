from pydantic import BaseModel


class StopCreate(BaseModel):
    stop_name: str