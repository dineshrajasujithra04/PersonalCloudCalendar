from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from .database import engine, Base, SessionLocal
from . import models, schemas, crud
from .routers import events
from .security import create_access_token


# =========================================================
# CREATE DATABASE TABLES
# =========================================================

Base.metadata.create_all(bind=engine)


app = FastAPI()


# =========================================================
# CORS CONFIGURATION
# =========================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "https://personalcalendar-e166.onrender.com",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================================================
# INCLUDE EVENT ROUTER
# =========================================================

app.include_router(events.router)


# =========================================================
# DATABASE DEPENDENCY
# =========================================================

def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


# =========================================================
# HOME API
# =========================================================

@app.get("/")
def home():
    return {
        "message": "Welcome to Personal Cloud Calendar API!"
    }


# =========================================================
# REGISTER USER
# =========================================================

@app.post("/register")
def register_user(
    user: schemas.UserCreate,
    db: Session = Depends(get_db)
):
    existing_user = crud.get_user_by_email(
        db,
        user.email
    )

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    return crud.create_user(
        db,
        user
    )


# =========================================================
# NORMAL LOGIN
# Used by your frontend
# =========================================================

@app.post("/login")
def login(
    user: schemas.UserLogin,
    db: Session = Depends(get_db)
):
    db_user = crud.login_user(
        db,
        user.email,
        user.password
    )

    if not db_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    access_token = create_access_token(
        data={"sub": db_user.email}
    )

    return {
        "message": "Login successful",
        "access_token": access_token,
        "token_type": "bearer",
        "user_id": db_user.id,
        "name": db_user.name,
        "email": db_user.email
    }


# =========================================================
# OAUTH2 LOGIN
# Used by Swagger Authorize button
# =========================================================

@app.post("/token")
def token(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    db_user = crud.login_user(
        db,
        form_data.username,
        form_data.password
    )

    if not db_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    access_token = create_access_token(
        data={"sub": db_user.email}
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }