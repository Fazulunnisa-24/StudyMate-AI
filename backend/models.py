from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import datetime

from database import Base


class QuizResult(Base):

    __tablename__ = "quiz_results"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    score = Column(Integer)

    total = Column(Integer)

    percentage = Column(Float)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )


class StudyTask(Base):

    __tablename__ = "study_tasks"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    title = Column(String)

    duration = Column(Integer)

    completed = Column(Integer, default=0)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )