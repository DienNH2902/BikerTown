from pydantic import BaseModel


class ToDoCreate(BaseModel):
    stop_id: int
    item_name: str
    item_status: bool
    item_order: int