import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
  reasoning?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ChatbotService {
  private geminiApiKey = environment.geminiApiKey || '';
  private geminiModel = 'gemini-1.5-flash';

  private systemInstruction = `You are Majdi AI, an intelligent AI virtual assistant representing Majdi Zamiti on his portfolio website.
Answer user questions accurately and professionally based strictly on Majdi's portfolio and CV knowledge base below:

- Name: Majdi Zamiti
- Professional Title: DevOps Engineer & Full-Stack Developer (RHCE Certified, Linux Specialist)
- Contact Info: Email (majdizamiti@gmail.com), LinkedIn (linkedin.com/in/majdizamiti), GitHub (github.com/majdizamiti)
- Summary: Passionate DevOps Engineer specialized in Linux system administration, Ansible automation, Docker, Kubernetes, and modern CI/CD pipelines.
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
  6. Upcoming (2026): NVIDIA Certified Associate (LLMs & GenAI), CKAD (Certified Kubernetes Application Developer), HashiCorp Terraform Associate (004).
- Professional Experience & Internships (from CV & Portfolio):
  1. Software Engineering Intern at Coworky (06/2026 – 08/2026): Built delivery platform with driver mobile app, admin dashboard, AI product categorization, route optimization, geolocation, real-time tracking. Tech: Spring Boot, React, Flutter, PostgreSQL.
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

  setApiKey(key: string): void {
    this.geminiApiKey = key.trim();
  }

  getApiKey(): string {
    return this.geminiApiKey;
  }

  async *streamChat(messages: ChatMessage[]): AsyncGenerator<{ content: string; reasoning: string }> {
    const latestMessage = messages[messages.length - 1]?.content || '';

    const contents = messages.map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

    const activeKey = this.geminiApiKey || environment.geminiApiKey;

    if (activeKey) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${this.geminiModel}:generateContent?key=${activeKey}`;
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            system_instruction: {
              parts: [{ text: this.systemInstruction }]
            },
            contents: contents,
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 1024,
            }
          }),
        });

        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.error?.message || response.statusText);
        }

        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text || 'I am here to help you learn more about Majdi Zamiti!';

        const words = text.split(' ');
        for (let i = 0; i < words.length; i++) {
          const chunk = (i === 0 ? '' : ' ') + words[i];
          yield { content: chunk, reasoning: '' };
          await new Promise(resolve => setTimeout(resolve, 15));
        }
        return;
      } catch (err: any) {
        console.warn('Gemini API request failed, falling back to local portfolio knowledge base:', err);
      }
    }

    const reply = this.getSmartFallbackResponse(latestMessage.toLowerCase());
    const words = reply.split(' ');
    for (let i = 0; i < words.length; i++) {
      const chunk = (i === 0 ? '' : ' ') + words[i];
      yield { content: chunk, reasoning: '' };
      await new Promise(resolve => setTimeout(resolve, 15));
    }
  }

  private getSmartFallbackResponse(query: string): string {
    if (query.includes('cert') || query.includes('red hat') || query.includes('rhce') || query.includes('rhcsa') || query.includes('pcap')) {
      return 'Majdi Zamiti holds 5 professional certifications earned between 2024 and 2026:\n\n• **RHCD Cloud** (Red Hat Certified Developer in Cloud-native Applications - Sep 2026)\n• **RHCA Ansible** (Red Hat Certified Advanced System Administrator in Ansible - Feb 2026)\n• **RHCE** (Red Hat Certified Engineer - 2025)\n• **RHCSA** (Red Hat Certified System Administrator - 2024)\n• **PCAP** (Python Certified Associate Programmer - 2024)\n\nUpcoming 2026: NVIDIA GenAI Associate, CKAD Kubernetes, HashiCorp Terraform Associate.';
    }

    if (query.includes('project') || query.includes('smart recruit') || query.includes('e-commerce') || query.includes('app')) {
      return 'Majdi has built several real-world applications and microservices infrastructures:\n\n1. **Smart Recruit** (In Progress): A microservices-based recruitment management platform (React, Spring Boot, MariaDB, PostgreSQL, Kubernetes, Docker, Prometheus).\n2. **Ecommerce Dashboard Admin Panel**: E-commerce administration platform (Angular, Spring Boot, MySQL, Kubernetes).\n3. **Workflow Automation with n8n**: Business process automation pipelines.\n4. **Smart Irrigation System**: IoT hardware & mobile application (Android Studio, Java, NodeMCU ESP8266, Firebase).';
    }

    if (query.includes('experience') || query.includes('intern') || query.includes('coworky') || query.includes('work')) {
      return 'Majdi’s professional experience includes:\n\n• **Software Engineering Intern at Coworky (06/2026 – 08/2026)**: Developed a delivery platform with driver mobile app, admin dashboard, AI product categorization, route optimization, geolocation (Spring Boot, React, Flutter, PostgreSQL).\n• **Project Intern at Coworky (08/2025 – 09/2025)**: Built an advanced n8n AI research assistant for journalists over WhatsApp.\n• **Intern at ISSAT Kairouan (02/2023 – 05/2023)**: End-of-study project titled "Smart Irrigation System".';
    }

    if (query.includes('skill') || query.includes('tech') || query.includes('stack') || query.includes('devops') || query.includes('linux')) {
      return 'Majdi’s technical stack includes:\n\n• **DevOps & Infrastructure**: Red Hat Enterprise Linux, Ansible Automation, Docker, Kubernetes, Prometheus, CI/CD Pipelines.\n• **Backend**: Java, Spring Boot, Node.js, Express, REST APIs, Microservices.\n• **Frontend**: Angular 21, React, TypeScript, Tailwind CSS, Redux.\n• **Mobile**: Flutter, Android Studio (Java, XML).\n• **Databases**: PostgreSQL, MariaDB, MySQL, MongoDB, Firebase.';
    }

    if (query.includes('contact') || query.includes('email') || query.includes('reach') || query.includes('hire') || query.includes('hello')) {
      return 'You can reach Majdi directly through:\n\n• **Email**: majdizamiti@gmail.com\n• **LinkedIn**: linkedin.com/in/majdizamiti\n• **GitHub**: github.com/majdizamiti\n\nMajdi is open to opportunities in DevOps and Full-Stack Engineering!';
    }

    return 'Hi! I’m Majdi AI. Majdi Zamiti is a DevOps Engineer and Full-Stack Developer specialized in Linux, Ansible, Docker, Kubernetes, Spring Boot, Angular, and React. Ask me about his certifications, projects, or experience!';
  }
}
