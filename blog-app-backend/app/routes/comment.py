from fastapi import APIRouter, Depends, Form, Header, HTTPException, Query
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Comment
from app.schemas import CommentCreate
from app.crud import CRUDBase
from app.auth import create_access_token, verify_token, get_password_hash, verify_password
import json

comment_crud = CRUDBase(Comment)

router = APIRouter()

@router.get("")
def get_many_comments(filter: str = Query(None), skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    filter_dict = json.loads(filter) if filter else {}

    return comment_crud.get_many(db, filters=filter_dict, skip=skip, limit=limit, relationships=['author'])

@router.post("")
def create_comment(
    blog_id: str = Form('blog_id'),
    content: str = Form('content'),
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
    comment_data = {
        "blog_id": blog_id,
        "content": content,
        'author_id': user_id
    }

    return comment_crud.create(db, comment_data)

@router.delete("/{comment_id}")
def delete_comment(comment_id: int, db: Session = Depends(get_db)):
    return comment_crud.delete(db, comment_id)