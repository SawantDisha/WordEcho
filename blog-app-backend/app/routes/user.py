from fastapi import APIRouter,Form, Depends, HTTPException, Header
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User
from app.schemas import UserCreate, Token
from app.auth import create_access_token, verify_token, get_password_hash, verify_password
from jose import jwt, JWTError

router = APIRouter()

@router.post("/register", response_model=Token)
def register(
    name: str = Form('name'),  # Name as a form field
    email: str = Form('email'),  # Email as a form field
    password: str = Form('password'),  # Password as a form field
    password_confirmation: str = Form('password_confirmation'),  # Password confirmation as a form field
    db: Session = Depends(get_db)  # Dependency to get DB session

):
    # Ensure password matches password confirmation
    if password != password_confirmation:
        raise ValueError("Passwords do not match")
    
    # Hash the password
    hashed_password = get_password_hash(password)
    
    # Create the new user
    new_user = User(
        name=name,
        email=email,
        password=hashed_password
    )
    
    # Add user to database
    db.add(new_user)
    db.commit()

    access_token = create_access_token({"sub": new_user.id})
    return {
        "access_token": access_token, 
        "token_type": "bearer",
        "id": new_user.id,
        "name": new_user.name,
        "email": new_user.email
    }

@router.post("/login", response_model=Token)
def login(
    email: str = Form('email'),  # Email as a form field
    password: str = Form('password'),  # Password as a form field
    db: Session = Depends(get_db)
):
    
    db_user = db.query(User).filter(User.email == email).first()
    if not db_user or not verify_password(password, db_user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    access_token = create_access_token({"sub": db_user.id})

    return {
        "access_token": access_token, 
        "token_type": "bearer",
        "id": db_user.id,
        "name": db_user.name,
        "email": db_user.email
    }

@router.get("/check", response_model=Token)
def check(
    db: Session = Depends(get_db),
    authorization: str = Header('authorization')
):
    # token = create_access_token({"sub": 1})  # Example with numeric user ID
    # print(verify_token(authorization))
    # print(token)
    # return {token: token}
    # return {'hi':'hello'}
    # Extract token from the Authorization header
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid Authorization header format")
    
    token = authorization[len("Bearer "):]


    # # Verify token and extract payload
    # print(token)
    payload = verify_token(token)
    # print(payload)
    user_id = payload.get("sub")

    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid token")

    # Fetch the user from the database
    db_user = db.query(User).filter(User.id == user_id).first()

    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    # Return the user's details
    return {
        "id": db_user.id,
        "name": db_user.name,
        "email": db_user.email,
        "access_token": token
    }