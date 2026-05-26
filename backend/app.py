from fastapi import FastAPI, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pypdf import PdfReader
import tempfile

app = FastAPI()

stored_text=""

app.add_middleware(
CORSMiddleware,
allow_origins=["http://localhost:5173"],
allow_credentials=True,
allow_methods=["*"],
allow_headers=["*"],
)

@app.post("/upload")
async def upload(file: UploadFile):

    global stored_text

    temp=tempfile.NamedTemporaryFile(
        delete=False
    )

    content=await file.read()

    temp.write(content)

    reader=PdfReader(temp.name)

    text=""

    for page in reader.pages:

        extracted=page.extract_text()

        if extracted:
            text+=extracted

    stored_text=text

    summary=".".join(
        text.split(".")[:5]
    )

    quiz=[]

    lines=text.split(".")

    for i in range(min(5,len(lines))):

        quiz.append(
            f"Q{i+1}: Explain {lines[i][:40]}?"
        )

    return{

        "summary":summary,

        "quiz":quiz

    }


@app.get("/chat")

async def chat(
question:str
):

    global stored_text

    text=stored_text.lower()

    q=question.lower()

    if q in text:

        answer="Answer found in notes"

    else:

        answer="Not found in notes"

    return{

        "answer":answer

    }