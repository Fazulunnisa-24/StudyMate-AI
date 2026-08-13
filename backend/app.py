import os
import json
import re
import io

from fastapi import FastAPI, UploadFile, File, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware

from sqlalchemy.orm import Session

from dotenv import load_dotenv

from google import genai

from PyPDF2 import PdfReader

from database import engine, Base, get_db
from models import QuizResult, StudyTask


# =========================================================
# ENVIRONMENT
# =========================================================

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    print("WARNING: GEMINI_API_KEY is not configured.")

else:
    print("Gemini API key loaded successfully.")


# =========================================================
# GEMINI CLIENT
# =========================================================

client = None

if GEMINI_API_KEY:

    client = genai.Client(
        api_key=GEMINI_API_KEY
    )


# =========================================================
# MODEL
# =========================================================

MODEL_NAME = "gemini-3.6-flash"


# =========================================================
# DATABASE
# =========================================================

Base.metadata.create_all(bind=engine)


# =========================================================
# FASTAPI
# =========================================================

app = FastAPI(
    title="StudyMate AI API",
    description="AI-powered study assistant",
    version="1.0.0"
)


# =========================================================
# CORS
# =========================================================

app.add_middleware(
    CORSMiddleware,

    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://meer-studymate-ai.netlify.app",
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)


# =========================================================
# GLOBAL PDF STORAGE
# =========================================================

stored_text = ""

stored_filename = ""


# =========================================================
# CHECK GEMINI
# =========================================================

def get_gemini_client():

    if client is None:

        raise HTTPException(
            status_code=500,
            detail="GEMINI_API_KEY is not configured."
        )

    return client


# =========================================================
# ROOT
# =========================================================

@app.get("/")
def root():

    return {
        "message": "StudyMate AI backend is running",
        "status": "ok",
        "model": MODEL_NAME
    }


# =========================================================
# PDF TEXT EXTRACTION
# =========================================================

def extract_pdf_text(file_bytes):

    try:

        pdf_file = io.BytesIO(
            file_bytes
        )

        reader = PdfReader(
            pdf_file
        )

        extracted_text = ""

        for page in reader.pages:

            text = page.extract_text()

            if text:

                extracted_text += (
                    text + "\n"
                )

        return extracted_text.strip()

    except Exception as error:

        print(
            "PDF EXTRACTION ERROR:",
            error
        )

        raise HTTPException(
            status_code=400,
            detail="Unable to extract text from PDF."
        )


# =========================================================
# CLEAN JSON
# =========================================================

def clean_json_response(text):

    text = text.strip()

    text = re.sub(
        r"^```json\s*",
        "",
        text,
        flags=re.IGNORECASE
    )

    text = re.sub(
        r"^```\s*",
        "",
        text
    )

    text = re.sub(
        r"\s*```$",
        "",
        text
    )

    return text.strip()


# =========================================================
# GENERATE SUMMARY
# =========================================================

def generate_summary(text):

    gemini = get_gemini_client()

    prompt = f"""
You are StudyMate AI, an intelligent study assistant.

Analyze the following study material and create a clear,
student-friendly summary.

IMPORTANT:

- Only use information present in the provided material.
- Do not invent facts.
- Make the summary useful for exam preparation.
- Use headings and bullet points.
- Explain difficult concepts in simple language.
- Include important definitions, commands, formulas,
  concepts, and examples when they exist.

STUDY MATERIAL:

{text}
"""

    response = gemini.models.generate_content(

        model=MODEL_NAME,

        contents=prompt
    )

    return response.text.strip()


# =========================================================
# GENERATE QUIZ
# =========================================================

def generate_quiz(text):

    gemini = get_gemini_client()

    prompt = f"""
You are StudyMate AI, an expert educational quiz generator.

Create exactly 10 multiple-choice questions from the
following study material.

IMPORTANT RULES:

1. Every question must be based ONLY on the study material.

2. Do not invent information.

3. Each question must have exactly 4 options.

4. The answer must be represented by an INTEGER:

0 = first option
1 = second option
2 = third option
3 = fourth option

5. Include a short explanation.

6. Include a topic.

7. Include difficulty:
Easy, Medium, or Hard.

8. Return ONLY valid JSON.

9. Do not include markdown.

10. Do not include ```json.

Return exactly this structure:

[
  {{
    "question": "Question text",

    "options": [
      "Option A",
      "Option B",
      "Option C",
      "Option D"
    ],

    "answer": 0,

    "explanation": "Why this answer is correct.",

    "topic": "Topic name",

    "difficulty": "Easy"
  }}
]

STUDY MATERIAL:

{text}
"""

    response = gemini.models.generate_content(

        model=MODEL_NAME,

        contents=prompt
    )

    raw_response = response.text.strip()

    cleaned = clean_json_response(
        raw_response
    )

    try:

        quiz = json.loads(
            cleaned
        )

    except json.JSONDecodeError as error:

        print(
            "QUIZ JSON ERROR:",
            error
        )

        print(
            "RAW GEMINI RESPONSE:"
        )

        print(raw_response)

        raise HTTPException(
            status_code=500,
            detail="AI generated an invalid quiz format."
        )

    if not isinstance(
        quiz,
        list
    ):

        raise HTTPException(
            status_code=500,
            detail="AI quiz format is invalid."
        )

    valid_questions = []

    for question in quiz:

        if not isinstance(
            question,
            dict
        ):
            continue

        if "question" not in question:
            continue

        if "options" not in question:
            continue

        if "answer" not in question:
            continue

        if not isinstance(
            question["options"],
            list
        ):
            continue

        if len(
            question["options"]
        ) != 4:
            continue

        if not isinstance(
            question["answer"],
            int
        ):
            continue

        if question["answer"] < 0:
            continue

        if question["answer"] > 3:
            continue

        valid_questions.append(
            question
        )

    if len(
        valid_questions
    ) == 0:

        raise HTTPException(
            status_code=500,
            detail="AI did not generate valid quiz questions."
        )

    return valid_questions[:10]


# =========================================================
# UPLOAD PDF
# =========================================================

@app.post("/upload")
async def upload_file(
    file: UploadFile = File(...)
):

    global stored_text
    global stored_filename

    print("--------------------------------")
    print("Upload started")
    print("File Name:", file.filename)
    print("--------------------------------")

    if not file.filename:

        raise HTTPException(
            status_code=400,
            detail="No file selected."
        )

    if not file.filename.lower().endswith(
        ".pdf"
    ):

        raise HTTPException(
            status_code=400,
            detail="Only PDF files are supported."
        )

    try:

        # -------------------------------------------------
        # READ FILE
        # -------------------------------------------------

        file_bytes = await file.read()

        # -------------------------------------------------
        # EXTRACT TEXT
        # -------------------------------------------------

        extracted_text = extract_pdf_text(
            file_bytes
        )

        print(
            "Extracted characters:",
            len(extracted_text)
        )

        if not extracted_text:

            raise HTTPException(
                status_code=400,
                detail="No readable text was found in the PDF."
            )

        # -------------------------------------------------
        # STORE TEXT
        # -------------------------------------------------

        stored_text = extracted_text

        stored_filename = file.filename

        # -------------------------------------------------
        # LIMIT TEXT
        # -------------------------------------------------

        text_for_ai = extracted_text[
            :50000
        ]

        # -------------------------------------------------
        # SUMMARY
        # -------------------------------------------------

        print(
            "Generating AI summary..."
        )

        summary = generate_summary(
            text_for_ai
        )

        print(
            "Summary generated."
        )

        # -------------------------------------------------
        # QUIZ
        # -------------------------------------------------

        print(
            "Generating AI quiz..."
        )

        quiz = generate_quiz(
            text_for_ai
        )

        print(
            "Quiz generated:",
            len(quiz),
            "questions"
        )

        # -------------------------------------------------
        # RETURN
        # -------------------------------------------------

        return {

            "success": True,

            "filename":
                file.filename,

            "text_length":
                len(extracted_text),

            "summary":
                summary,

            "quiz":
                quiz
        }

    except HTTPException:

        raise

    except Exception as error:

        print(
            "================================"
        )

        print(
            "UPLOAD ERROR"
        )

        print(
            error
        )

        print(
            "================================"
        )

        raise HTTPException(
            status_code=500,
            detail=str(error)
        )


# =========================================================
# AI TUTOR
# =========================================================

@app.get("/chat")
def chat(
    question: str
):

    global stored_text

    if not stored_text:

        raise HTTPException(
            status_code=400,
            detail="Please upload a PDF before using the AI Tutor."
        )

    if not question.strip():

        raise HTTPException(
            status_code=400,
            detail="Please enter a question."
        )

    try:

        gemini = get_gemini_client()

        context = stored_text[
            :50000
        ]

        prompt = f"""
You are StudyMate AI Tutor.

Answer the student's question using ONLY the
provided study material.

IMPORTANT:

- Do not invent information.
- If the answer is not available in the notes,
  clearly say that it is not covered in the uploaded
  material.
- Explain concepts in simple student-friendly language.
- Use examples when useful.
- Structure long answers with headings or bullet points.

STUDY MATERIAL:

{context}

STUDENT QUESTION:

{question}
"""

        response = gemini.models.generate_content(

            model=MODEL_NAME,

            contents=prompt
        )

        answer = response.text.strip()

        return {

            "success": True,

            "question":
                question,

            "answer":
                answer
        }

    except Exception as error:

        print(
            "CHAT ERROR:",
            error
        )

        raise HTTPException(
            status_code=500,
            detail=str(error)
        )


# =========================================================
# SAVE QUIZ RESULT
# =========================================================

@app.post("/quiz-result")
def save_quiz_result(

    score: int,

    total: int,

    percentage: float,

    db: Session = Depends(get_db)

):

    try:

        result = QuizResult(

            score=score,

            total=total,

            percentage=percentage
        )

        db.add(
            result
        )

        db.commit()

        db.refresh(
            result
        )

        return {

            "success": True,

            "message":
                "Quiz result saved successfully",

            "id":
                result.id
        }

    except Exception as error:

        db.rollback()

        print(
            "SAVE QUIZ RESULT ERROR:",
            error
        )

        raise HTTPException(
            status_code=500,
            detail="Unable to save quiz result."
        )


# =========================================================
# GET QUIZ RESULTS
# =========================================================

@app.get("/quiz-results")
def get_quiz_results(

    db: Session = Depends(get_db)

):

    try:

        results = (

            db.query(
                QuizResult
            )

            .order_by(
                QuizResult.created_at.desc()
            )

            .all()
        )

        return [

            {

                "id":
                    result.id,

                "score":
                    result.score,

                "total":
                    result.total,

                "percentage":
                    result.percentage,

                "created_at":
                    result.created_at
            }

            for result in results
        ]

    except Exception as error:

        print(
            "GET QUIZ RESULTS ERROR:",
            error
        )

        raise HTTPException(
            status_code=500,
            detail="Unable to retrieve quiz results."
        )


# =========================================================
# SAVE STUDY TASK
# =========================================================

@app.post("/study-task")
def save_study_task(

    title: str,

    duration: int,

    db: Session = Depends(get_db)

):

    try:

        task = StudyTask(

            title=title,

            duration=duration,

            completed=0
        )

        db.add(
            task
        )

        db.commit()

        db.refresh(
            task
        )

        return {

            "success": True,

            "message":
                "Study task saved",

            "id":
                task.id
        }

    except Exception as error:

        db.rollback()

        print(
            "SAVE STUDY TASK ERROR:",
            error
        )

        raise HTTPException(
            status_code=500,
            detail="Unable to save study task."
        )


# =========================================================
# GET STUDY TASKS
# =========================================================

@app.get("/study-tasks")
def get_study_tasks(

    db: Session = Depends(get_db)

):

    try:

        tasks = (

            db.query(
                StudyTask
            )

            .order_by(
                StudyTask.created_at.desc()
            )

            .all()
        )

        return [

            {

                "id":
                    task.id,

                "title":
                    task.title,

                "duration":
                    task.duration,

                "completed":
                    bool(task.completed),

                "created_at":
                    task.created_at
            }

            for task in tasks
        ]

    except Exception as error:

        print(
            "GET STUDY TASKS ERROR:",
            error
        )

        raise HTTPException(
            status_code=500,
            detail="Unable to retrieve study tasks."
        )


# =========================================================
# UPDATE STUDY TASK
# =========================================================

@app.put(
    "/study-task/{task_id}"
)
def update_study_task(

    task_id: int,

    completed: bool,

    db: Session = Depends(get_db)

):

    task = (

        db.query(
            StudyTask
        )

        .filter(
            StudyTask.id == task_id
        )

        .first()
    )

    if not task:

        raise HTTPException(
            status_code=404,
            detail="Study task not found."
        )

    task.completed = (
        1 if completed else 0
    )

    db.commit()

    db.refresh(
        task
    )

    return {

        "success": True,

        "id":
            task.id,

        "completed":
            bool(task.completed)
    }


# =========================================================
# DELETE STUDY TASK
# =========================================================

@app.delete(
    "/study-task/{task_id}"
)
def delete_study_task(

    task_id: int,

    db: Session = Depends(get_db)

):

    task = (

        db.query(
            StudyTask
        )

        .filter(
            StudyTask.id == task_id
        )

        .first()
    )

    if not task:

        raise HTTPException(
            status_code=404,
            detail="Study task not found."
        )

    db.delete(
        task
    )

    db.commit()

    return {

        "success": True,

        "message":
            "Study task deleted"
    }


# =========================================================
# STARTUP MESSAGE
# =========================================================

print("")
print("========================================")
print("       STUDYMATE AI BACKEND")
print("========================================")
print("API:      FastAPI")
print("Database: SQLite")
print("Model:    " + MODEL_NAME)
print("========================================")