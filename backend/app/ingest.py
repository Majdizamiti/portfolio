from app.knowledge import load_knowledge_context

ctx = load_knowledge_context()
print(f"Successfully loaded portfolio knowledge context ({len(ctx)} chars)")
