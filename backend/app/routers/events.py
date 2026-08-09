from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database import SessionLocal
from .. import crud, schemas
from ..security import get_current_user_email


router = APIRouter(
    prefix="/events",
    tags=["Events"]
)


# Database dependency
def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


# Create Event
@router.post("/")
def create_event(
    event: schemas.EventCreate,
    db: Session = Depends(get_db),
    email: str = Depends(get_current_user_email)
):
    user = crud.get_user_by_email(db, email)

    if user is None:
        raise HTTPException(
            status_code=401,
            detail="User not found"
        )

    return crud.create_event(
        db,
        event,
        user.id
    )


# Get all Events
@router.get("/")
def get_events(
    db: Session = Depends(get_db),
    email: str = Depends(get_current_user_email)
):
    user = crud.get_user_by_email(db, email)

    if user is None:
        raise HTTPException(
            status_code=401,
            detail="User not found"
        )

    return crud.get_events(
        db,
        user.id
    )


# Get one Event
@router.get("/{event_id}")
def get_event(
    event_id: int,
    db: Session = Depends(get_db),
    email: str = Depends(get_current_user_email)
):
    user = crud.get_user_by_email(db, email)

    if user is None:
        raise HTTPException(
            status_code=401,
            detail="User not found"
        )

    event = crud.get_event(
        db,
        event_id,
        user.id
    )

    if event is None:
        raise HTTPException(
            status_code=404,
            detail="Event not found"
        )

    return event


# Update Event
@router.put("/{event_id}")
def update_event(
    event_id: int,
    updated_event: schemas.EventCreate,
    db: Session = Depends(get_db),
    email: str = Depends(get_current_user_email)
):
    user = crud.get_user_by_email(db, email)

    if user is None:
        raise HTTPException(
            status_code=401,
            detail="User not found"
        )

    event = crud.update_event(
        db,
        event_id,
        updated_event,
        user.id
    )

    if event is None:
        raise HTTPException(
            status_code=404,
            detail="Event not found"
        )

    return event


# Delete Event
@router.delete("/{event_id}")
def delete_event(
    event_id: int,
    db: Session = Depends(get_db),
    email: str = Depends(get_current_user_email)
):
    user = crud.get_user_by_email(db, email)

    if user is None:
        raise HTTPException(
            status_code=401,
            detail="User not found"
        )

    event = crud.delete_event(
        db,
        event_id,
        user.id
    )

    if event is None:
        raise HTTPException(
            status_code=404,
            detail="Event not found"
        )

    return {
        "message": "Event deleted successfully"
    }