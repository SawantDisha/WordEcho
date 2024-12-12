from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from fastapi import HTTPException, status
from sqlalchemy.orm import joinedload
from sqlalchemy.orm.attributes import InstrumentedAttribute

class CRUDBase:
    def __init__(self, model):
        """
        Initialize with the SQLAlchemy model.
        :param model: The SQLAlchemy model class (e.g., Blog, User).
        """
        self.model = model

    def get_many(self, db: Session, filters: dict = None,  skip: int = 0, limit: int = 10, relationships: list = None):
        """
        Get a list of items.
        :param db: Database session.
        :param skip: Number of items to skip.
        :param limit: Maximum number of items to return.
        :return: List of model instances.
        """
        # return {
        #     'data': db.query(self.model).offset(skip).limit(limit).all()
        # }
        query = db.query(self.model)

        print(relationships)

        # Apply relationship loading
        if relationships:
            for rel in relationships:
                # Check if the relationship is a valid attribute of the model
                attr = getattr(self.model, rel, None)
                if isinstance(attr, InstrumentedAttribute):
                    query = query.options(joinedload(attr))
                else:
                    raise ValueError(f"'{rel}' is not a valid relationship on '{self.model.__name__}'")



        # Apply dynamic filters
        if filters:
            for field, value in filters.items():
                if hasattr(self.model, field):  # Ensure the field exists on the model
                    query = query.filter(getattr(self.model, field) == value)

        # Add pagination
        return {'data' : query.offset(skip).limit(limit).all()}


    def get(self, db: Session, item_id: int):
        """
        Get a single item by ID.
        :param db: Database session.
        :param item_id: ID of the item.
        :return: Model instance or raises HTTPException if not found.
        """
        item = db.query(self.model).filter(self.model.id == item_id).first()
        if not item:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"{self.model.__name__} with ID {item_id} not found"
            )
        return { 'data': item}

    def create(self, db: Session, obj_in: dict):
        """
        Create a new item.
        :param db: Database session.
        :param obj_in: Dictionary of field values.
        :return: Created model instance.
        """
        item = self.model(**obj_in)
        try:
            db.add(item)
            db.commit()
            db.refresh(item)
            return {'data': item}
        except IntegrityError:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Error creating the item. Ensure data integrity."
            )

    def update(self, db: Session, item_id: int, obj_in: dict):
        """
        Update an existing item.
        :param db: Database session.
        :param item_id: ID of the item to update.
        :param obj_in: Dictionary of updated field values.
        :return: Updated model instance or raises HTTPException if not found.
        """
        # Retrieve the item from the database
        item = self.get(db, item_id)
        
        if not item:
            raise HTTPException(status_code=404, detail="Item not found")

        db.query(self.model).filter(self.model.id == item_id).update(obj_in)
        db.commit()

        # Fetch the updated instance
        updated_item = self.get(db, item_id)

        return {'data': updated_item}

    def delete(self, db: Session, item_id: int):
        """
        Delete an item by ID.
        :param db: Database session.
        :param item_id: ID of the item to delete.
        :return: Deleted model instance or raises HTTPException if not found.
        """
        # item = self.get(db, item_id)
        db.query(self.model).filter(self.model.id == item_id).delete()
        # db.delete(item)
        db.commit()
        return {'data':''}
