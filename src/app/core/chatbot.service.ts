import { Injectable } from '@angular/core';

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
  reasoning?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ChatbotService {
  private apiKey = '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';
  private apiUrl = 'https://integrate.api.nvidia.com/v1/chat/completions';
  private model = 'openai/gpt-oss-20b';

  private systemPrompt = `You are Majdi AI, an intelligent AI virtual assistant representing Majdi Zamiti on his portfolio website.
Answer user questions accurately and professionally based strictly on Majdi's portfolio and CV knowledge base below:

- Name: Majdi Zamiti
- Professional Title: DevOps Engineer & Full-Stack Developer (RHCE Certified, Linux Specialist)
- Contact Info: Email (majdizamiti@gmail.com), LinkedIn (linkedin.com/in/majdizamiti), GitHub (github.com/majdizamiti)
- Summary: Passionate DevOps Engineer specialized in Linux system administration, Ansible automation, Docker, Kubernetes, and modern CI/CD pipelines. Experienced in building scalable microservices, automated delivery platforms, and web/mobile apps.
- Technical Skills:
  * DevOps & Infrastructure: Red Hat Enterprise Linux (RHEL), Ansible Automation, Docker, Kubernetes, Prometheus, CI/CD Pipelines
  * Backend: Java, Spring Boot, Node.js, Express, REST APIs, Microservices Architecture
  * Frontend: Angular 21, React, TypeScript, Tailwind CSS, Redux, HTML5, CSS3
  * Mobile: Flutter, Android Studio (Java, XML)
  * Databases & Cloud: PostgreSQL, MariaDB, MySQL, MongoDB, Firebase Realtime DB
  * Workflow & AI: n8n Workflows, Webhooks, REST Integrations, World Bank API
- Certifications (Earned 2024–2026):
  1. RHCD Cloud (Red Hat Certified Developer in Cloud-native Applications - Sep 2026)
  2. RHCA Ansible (Red Hat Certified Advanced System Administrator in Ansible - Feb 2026)
  3. RHCE (Red Hat Certified Engineer - 2025)
  4. RHCSA (Red Hat Certified System Administrator - 2024)
  5. PCAP (Python Certified Associate Programmer - 2024)
- Professional Experience & Internships (from CV & Portfolio):
  1. Software Engineering Intern at Coworky (06/2026 – 08/2026): Built delivery platform with driver mobile app, admin dashboard, AI product categorization, route optimization, geolocation, real-time tracking, and route optimization. Tech: Spring Boot, React, Flutter, PostgreSQL.
  2. Project Intern at Coworky (08/2025 – 09/2025): Developed an advanced n8n workflow acting as an AI research assistant for journalists over WhatsApp, querying World Bank economic data and web research. Tech: n8n, JavaScript, World Bank API.
  3. Intern at ISSAT Kairouan (02/2023 – 05/2023): End-of-study project titled "Smart Irrigation System" controlling sensors and actuators from a mobile application. Tech: Java, XML, NodeMCU ESP8266, Firebase.
- Projects:
  1. Smart Recruit: Microservices-based recruitment management platform automating candidate tracking, job postings, and hiring workflows with distributed services and real-time monitoring (React, Spring Boot, MariaDB, PostgreSQL, Kubernetes, Docker, Prometheus).
  2. Ecommerce Dashboard Admin Panel: Administration panel for managing products, orders, users, and store analytics (Angular, Spring Boot, MySQL, Kubernetes).
  3. Workflow Automation with n8n: Complex business process automation and data pipeline synchronization using self-hosted n8n workflows.
  4. Smart Irrigation App: Smart irrigation system controlling sensors and actuators via mobile app (Android Studio, Java, XML, NodeMCU ESP8266, Firebase).
  5. React Frontend Application: High-performance single-page application built with React.
  6. Node.js Backend Service: Scalable RESTful API backend handling authentication and data processing.
  7. Islamic App: Mobile application for accessing Islamic content and resources.

INSTRUCTIONS:
- Answer user questions strictly based on this portfolio and CV knowledge base.
- Be concise, professional, and enthusiastic. Use bullet points when appropriate.`;

  async *streamChat(messages: ChatMessage[]): AsyncGenerator<{ content: string; reasoning: string }> {
    const formattedMessages = [
      { role: 'system', content: this.systemPrompt },
      ...messages.map(m => ({ role: m.role, content: m.content }))
    ];

    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: this.model,
          messages: formattedMessages,
          temperature: 1,
          top_p: 1,
          max_tokens: 4096,
          stream: false,
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`API Error (${response.status}): ${errText || response.statusText}`);
      }

      const json = await response.json();
      const message = json.choices?.[0]?.message;
      const reasoning = message?.reasoning_content || '';
      const content = message?.content || 'I am here to help you learn more about Majdi Zamiti!';

      if (reasoning) {
        yield { content: '', reasoning };
      }

      const words = content.split(' ');
      for (let i = 0; i < words.length; i++) {
        const chunk = (i === 0 ? '' : ' ') + words[i];
        yield { content: chunk, reasoning: '' };
        await new Promise(resolve => setTimeout(resolve, 15));
      }

    } catch (error: any) {
      const fallbackReply = `Hello! I am Majdi AI. Majdi Zamiti is a DevOps Engineer and Full-Stack Developer specializing in Linux, Ansible, Docker, Kubernetes, Spring Boot, and Angular. You can reach him at contact@majdizamiti.com.`;

      const words = fallbackReply.split(' ');
      for (let i = 0; i < words.length; i++) {
        const chunk = (i === 0 ? '' : ' ') + words[i];
        yield { content: chunk, reasoning: '' };
        await new Promise(resolve => setTimeout(resolve, 15));
      }
    }
  }
}
