from dotenv import load_dotenv
load_dotenv()
import os
from together import Together
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

TOGETHER_API_KEY = os.getenv("TOGETHER_API_KEY")
assert TOGETHER_API_KEY, "Set TOGETHER_API_KEY in your .env"

client = Together(api_key=TOGETHER_API_KEY)
TOGETHER_MODEL = "Qwen/Qwen3-235B-A22B-Instruct-2507-tput"


METRICS = [
    "Market Demand", "Originality", "Monetization", "Distribution",
    "Execution Complexity", "Competition", "Growth Potential"
]

class IdeaRequest(BaseModel):
    idea: str

def build_prompt(idea: str):
    metrics_prompt = "\n".join(f'- "{m}"' for m in METRICS)
    return f"""
You are a honest startup and project analyst. 
Rate the following startup/product/project idea. Output in strict minified JSON.
your scoring must not be generic and every metric must be justified in your thought process, including total score.
the output must be exactly as defined.

Startup idea: "{idea}"

Analyze and return:
- total_score: integer 0-100, rate this idea well, do give good ideas a high score and non-sense 0.
- summary: 3-4 line objective summary (no hype)
- metrics: for each metric below, assign a score (0-10, integer only), output as: [{{"name": <metric>, "score": <int>}}, ...]
  Metrics: {metrics_prompt}
- strengths: 2-4 concise bullet points
- weaknesses: 2-4 concise bullet points
- suggestions: 2-4 actionable suggestions
- alternate_ideas: 2-3 concise alternate takes/markets

Return only strict JSON in this exact schema:
{{
  "total_score": 0,
  "summary": "...",
  "metrics": [{{"name": "...", "score": 0}}, ...],
  "strengths": ["...", "..."],
  "weaknesses": ["...", "..."],
  "suggestions": ["...", "..."],
  "alternate_ideas": ["...", "..."]
}}
"""

@app.get("/ping")
def ping():
    return {"status": "ok"}


@app.post("/")
async def rate_my_idea(payload: IdeaRequest):
    idea = payload.idea
    prompt = build_prompt(idea)

    response = client.chat.completions.create(
        model=TOGETHER_MODEL,
        messages=[{"role": "user", "content": prompt}],
        max_tokens=512,
        temperature=0.2,
        top_p=0.85,
    )
    print(response)
    content = response.choices[0].message.content
    import json
    try:
        if content.startswith("```"):
            content = content.split("```")[1].strip()
        data = json.loads(content)
    except Exception as e:
        return {"error": f"Invalid model output: {str(e)}", "raw": content}
    raw_total = sum(m["score"] for m in data["metrics"])
    max_possible = len(METRICS) * 10
    scaled_total = round(raw_total / max_possible * 100)

    return {
        "summary": data["summary"],
        "metrics": data["metrics"],
        "total_score": data["total_score"],
        "max_score": 100,
        "strengths": data["strengths"],
        "weaknesses": data["weaknesses"],
        "suggestions": data["suggestions"],
        "alternate_ideas": data["alternate_ideas"],
    }
