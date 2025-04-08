from fastapi import Depends, FastAPI
from sqlalchemy.orm import Session
from database import get_db
from models.user_model import User

# Initialize FastAPI app
app = FastAPI()


# Test endpoint to check the app is working
@app.get("/")
def read_root(db: Session = Depends(get_db)):
    result = db.query(User).filter(User.username == "admin").first()
    

    response = {
        "username": result.username,
        "display_name": result.display_name,
        "gender": result.gender,
        "dob": result.dob,
        "vehicle": result.vehicle,
        "created_date": result.created_date
    }
    
    return response
