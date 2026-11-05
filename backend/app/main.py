import os
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from app import llm

load_dotenv()

app = FastAPI(title="Portfolio AI assistant")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class Turn(BaseModel):
    role: str = Field(..., description="user or assistant")
    content: str = Field(..., max_length=1000)


class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=1000)
    history: list[Turn] = Field(default_factory=list, max_length=12)


class ChatResponse(BaseModel):
    answer: str
    reasoning: str | None = None
    sources: list[str]


@app.post("/api/chat", response_model=ChatResponse)
def chat(body: ChatRequest) -> ChatResponse:
    try:
        history_dicts = [t.model_dump() for t in body.history]
        answer_text, reasoning = llm.generate_answer(history_dicts, body.message)
        return ChatResponse(
            answer=answer_text,
            reasoning=reasoning,
            sources=["Portfolio & CV Knowledge Base"]
        )
    except Exception as exc:
        print(f"chat error: {exc}")
        raise HTTPException(status_code=500, detail=str(exc))
