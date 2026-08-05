from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database import SessionLocal
from .. import crud, schemas

router = APIRouter(
    prefix="/events",
    tags=["Events"]
)


# Database connection
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Create a new event
@router.post("/")
def create_event(event: schemas.EventCreate, db: Session = Depends(get_db)):
    return crud.create_event(db, event)


# Get all events
@router.get("/")
def get_events(db: Session = Depends(get_db)):
    return crud.get_events(db)


# Get one event by ID
@router.get("/{event_id}")
def get_event(event_id: int, db: Session = Depends(get_db)):
    event = crud.get_event(db, event_id)

    if event is None:
        raise HTTPException(status_code=404, detail="Event not found")

    return event
# Update an event
@router.put("/{event_id}")
def update_event(
    event_id: int,
    updated_event: schemas.EventCreate,
    db: Session = Depends(get_db)
):
    event = crud.update_event(db, event_id, updated_event)

    if event is None:
        raise HTTPException(status_code=404, detail="Event not found")

    return event
# Delete an event
@router.delete("/{event_id}")
def delete_event(event_id: int, db: Session = Depends(get_db)):
    event = crud.delete_event(db, event_id)

    if event is None:
        raise HTTPException(status_code=404, detail="Event not found")

    return {"message": "Event deleted successfully"}