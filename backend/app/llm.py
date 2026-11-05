import os
import openai
from dotenv import load_dotenv
from app.store import get_portfolio_context

load_dotenv()

client = openai.OpenAI(
    api_key=os.environ.get("NVIDIA_API_KEY"),
    base_url="https://integrate.api.nvidia.com/v1"
)

SYSTEM_TEMPLATE = """You are Majdi AI, an intelligent AI virtual assistant representing Majdi Zamiti on his portfolio website.
Answer user questions accurately and professionally based strictly on Majdi's portfolio and CV knowledge base below:

{context}

INSTRUCTIONS:
- Answer user questions strictly based on this portfolio and CV knowledge base.
- Be concise, professional, and enthusiastic. Use bullet points when appropriate."""

def generate_answer(history: list[dict], message: str) -> tuple[str, str | None]:
    context = get_portfolio_context()
    system_prompt = SYSTEM_TEMPLATE.format(context=context)

    messages = [{"role": "system", "content": system_prompt}]
    for turn in history[-6:]:
        messages.append({"role": turn["role"], "content": turn["content"]})
    messages.append({"role": "user", "content": message})

    completion = client.chat.completions.create(
        model="openai/gpt-oss-20b",
        messages=messages,
        temperature=1,
        top_p=1,
        max_tokens=4096,
        stream=False
    )

    choice = completion.choices[0]
    reasoning = getattr(choice.message, "reasoning_content", None)
    content = choice.message.content or "I am here to help you learn more about Majdi Zamiti!"

    return content, reasoning
