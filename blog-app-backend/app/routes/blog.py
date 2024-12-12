from fastapi import APIRouter, Depends, Form, Header, HTTPException, Query
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas import BlogCreate, BlogUpdate
from app.models import Blog
from app.crud import CRUDBase
from app.auth import create_access_token, verify_token, get_password_hash, verify_password
import json

blog_crud = CRUDBase(Blog)

router = APIRouter()

@router.get("")
def get_many_blogs(filter: str = Query(None), skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    filter_dict = json.loads(filter) if filter else {}

    return blog_crud.get_many(db, filters=filter_dict, skip=skip, limit=limit, relationships=['author'])

@router.get("/{blog_id}")
def get_blog(blog_id: int, db: Session = Depends(get_db)):
    return blog_crud.get(db, blog_id)

@router.post("")
def create_blog(
    title: str = Form('title'),
    sub_title: str = Form('sub_title'),
    content: str = Form('content'),
    date: str = Form('date'),
    db: Session = Depends(get_db),
    authorization: str = Header('authorization')
):
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid Authorization header format")
    
    token = authorization[len("Bearer "):]
    payload = verify_token(token)
    # print(payload)
    user_id = payload.get("sub")

    # Create a dictionary to match BlogCreate schema
    blog_data = {
        "title": title,
        "sub_title": sub_title,
        "content": content,
        "date": date,
        'author_id': user_id
    }

    return blog_crud.create(db, blog_data)

@router.put("/{blog_id}")
def update_blog(
    blog_id: int,
    title: str = Form('title'),  # Mark required with "..."
    sub_title: str = Form('sub_title'),
    content: str = Form('content'),
    date: str = Form('date'),
    db: Session = Depends(get_db)
):
    # Create a dictionary to match Blog schema
    blog_data = {
        "title": title,
        "sub_title": sub_title,
        "content": content,
        "date": date,
    }
    return blog_crud.update(db, blog_id, blog_data)


@router.delete("/{blog_id}")
def delete_blog(blog_id: int, db: Session = Depends(get_db)):
    return blog_crud.delete(db, blog_id)