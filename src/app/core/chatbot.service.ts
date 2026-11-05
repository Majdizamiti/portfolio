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
  private apiUrl = 'http://localhost:8000/api/chat';

  async *streamChat(messages: ChatMessage[]): AsyncGenerator<{ content: string; reasoning: string }> {
    const history = messages.slice(0, -1).map(m => ({
      role: m.role === 'assistant' ? 'assistant' : 'user',
      content: m.content
    }));
    const latestMessage = messages[messages.length - 1]?.content || '';

    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: latestMessage,
          history: history
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`API Error (${response.status}): ${errText || response.statusText}`);
      }

      const data = await response.json();
      const answer = data.answer || 'I am here to help you learn more about Majdi Zamiti!';

      // Smooth, responsive word streaming effect for the frontend UI
      const words = answer.split(' ');
      for (let i = 0; i < words.length; i++) {
        const chunk = (i === 0 ? '' : ' ') + words[i];
        yield { content: chunk, reasoning: data.reasoning || '' };
        await new Promise(resolve => setTimeout(resolve, 20));
      }
    } catch (err: any) {
      const fallback = `I am currently unable to reach the AI backend service (${err.message || 'connection refused'}). Please ensure the Python backend is running on http://localhost:8000 or reach out to Majdi directly at majdizamiti@gmail.com!`;
      const words = fallback.split(' ');
      for (let i = 0; i < words.length; i++) {
        const chunk = (i === 0 ? '' : ' ') + words[i];
        yield { content: chunk, reasoning: '' };
        await new Promise(resolve => setTimeout(resolve, 20));
      }
    }
  }
}
