import json


def load_knowledge_context(path: str = "data/portfolio.json") -> str:
    with open(path, encoding="utf-8") as f:
        d = json.load(f)

    lines = []
    lines.append(f"Name: {d['profile']['name']}")
    lines.append(f"Title: {d['profile']['title']}")
    lines.append(f"Bio: {d['profile']['bio']}")
    lines.append("\nSkills:")
    for s in d["skills"]:
        lines.append(f"- {s['category']}: {', '.join(s['items'])}")

    lines.append("\nCertifications:")
    for c in d["certifications"]:
        lines.append(f"- {c['name']} ({c['full']}), issued by {c['issuer']}, {c['date']}")

    lines.append("\nExperience & Internships:")
    for e in d["experience"]:
        lines.append(f"- {e['role']} at {e['org']} ({e['period']}): {e['summary']} Tech: {', '.join(e['tech'])}")

    lines.append("\nProjects:")
    for p in d["projects"]:
        lines.append(f"- {p['name']}: {p['summary']} Tech: {', '.join(p['tech'])}")

    return "\n".join(lines)
