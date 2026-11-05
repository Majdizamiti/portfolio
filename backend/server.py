import os
import json
from http.server import HTTPServer, BaseHTTPRequestHandler
import urllib.request
import urllib.error

NVIDIA_API_KEY = "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"
NVIDIA_URL = "https://integrate.api.nvidia.com/v1/chat/completions"

SYSTEM_PROMPT = """You are Majdi AI, an intelligent AI virtual assistant representing Majdi Zamiti on his portfolio website.
Answer user questions accurately and professionally based strictly on Majdi's portfolio and CV knowledge base below:

- Name: Majdi Zamiti
- Professional Title: DevOps Engineer & Full-Stack Developer (RHCE Certified, Linux Specialist)
- Contact Info: Email (majdizamiti@gmail.com), LinkedIn (linkedin.com/in/majdizamiti), GitHub (github.com/majdizamiti)
- Summary: Passionate DevOps Engineer specialized in Linux system administration, Ansible automation, Docker, Kubernetes, and modern CI/CD pipelines.
- Technical Skills: Red Hat Enterprise Linux, Ansible, Docker, Kubernetes, Prometheus, CI/CD, Java, Spring Boot, Node.js, Angular 21, React, TypeScript, Flutter, PostgreSQL, MariaDB, MongoDB, n8n.
- Certifications: RHCD Cloud (Sep 2026), RHCA Ansible (Feb 2026), RHCE (2025), RHCSA (2024), PCAP (2024), NVIDIA GenAI, CKAD, Terraform Associate (004).
- Experience: Software Engineering Intern at Coworky, Project Intern at Coworky, Intern at ISSAT Kairouan.
- Projects: Smart Recruit, E-commerce Admin Panel, Workflow Automation with n8n, Smart Irrigation App, React Frontend, Node.js Backend, Islamic App.

Be concise, friendly, and helpful."""

class PortfolioHandler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        self.end_headers()

    def do_GET(self):
        if self.path == "/" or self.path == "/api/health":
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(json.dumps({"status": "online", "service": "Majdi Portfolio AI Assistant"}).encode('utf-8'))
        elif self.path == "/favicon.ico":
            self.send_response(204)
            self.end_headers()
        else:
            self.send_response(404)
            self.end_headers()

    def do_POST(self):
        if self.path == "/api/chat":
            content_length = int(self.headers.get('Content-Length', 0))
            body_data = self.rfile.read(content_length)
            try:
                data = json.loads(body_data.decode('utf-8'))
                message = data.get("message", "")
                history = data.get("history", [])

                messages = [{"role": "system", "content": SYSTEM_PROMPT}]
                for turn in history[-6:]:
                    messages.append({"role": turn.get("role"), "content": turn.get("content")})
                messages.append({"role": "user", "content": message})

                payload = {
                    "model": "openai/gpt-oss-20b",
                    "messages": messages,
                    "temperature": 0.7,
                    "top_p": 1,
                    "max_tokens": 1024,
                    "stream": False
                }

                req = urllib.request.Request(
                    NVIDIA_URL,
                    data=json.dumps(payload).encode('utf-8'),
                    headers={
                        "Content-Type": "application/json",
                        "Authorization": f"Bearer {NVIDIA_API_KEY}"
                    },
                    method="POST"
                )

                with urllib.request.urlopen(req) as resp:
                    res_body = json.loads(resp.read().decode('utf-8'))
                    choice = res_body.get("choices", [{}])[0].get("message", {})
                    answer = choice.get("content", "") or "I am here to help you learn more about Majdi Zamiti!"
                    reasoning = choice.get("reasoning_content", "")

                    response_data = {
                        "answer": answer,
                        "reasoning": reasoning,
                        "sources": ["Portfolio & CV Knowledge Base"]
                    }

                    self.send_response(200)
                    self.send_header("Content-Type", "application/json")
                    self.send_header("Access-Control-Allow-Origin", "*")
                    self.end_headers()
                    self.wfile.write(json.dumps(response_data).encode('utf-8'))

            except urllib.error.HTTPError as e:
                err_content = e.read().decode('utf-8')
                print(f"NVIDIA API HTTP Error {e.code}: {err_content}")
                self.send_response(500)
                self.send_header("Content-Type", "application/json")
                self.send_header("Access-Control-Allow-Origin", "*")
                self.end_headers()
                self.wfile.write(json.dumps({"error": err_content}).encode('utf-8'))
            except Exception as exc:
                print(f"Error: {exc}")
                self.send_response(500)
                self.send_header("Content-Type", "application/json")
                self.send_header("Access-Control-Allow-Origin", "*")
                self.end_headers()
                self.wfile.write(json.dumps({"error": str(exc)}).encode('utf-8'))
        else:
            self.send_response(404)
            self.end_headers()

    def log_message(self, format, *args):
        print(f"[{args[0]}] {args[1]}")

def run(port=8000):
    server_address = ('127.0.0.1', port)
    httpd = HTTPServer(server_address, PortfolioHandler)
    print(f"Portfolio AI Server running on http://127.0.0.1:{port}")
    httpd.serve_forever()

if __name__ == '__main__':
    run()
