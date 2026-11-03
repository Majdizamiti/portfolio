import { Component, ElementRef, ViewChild, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatbotService, ChatMessage } from '../../core/chatbot.service';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.html',
  styleUrls: ['./chatbot.css'],
})
export class ChatbotComponent {
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef<HTMLDivElement>;

  isOpen = signal(false);
  isTyping = signal(false);
  userInput = signal('');

  messages = signal<ChatMessage[]>([
    {
      role: 'assistant',
      content: 'Hi! I’m Majdi AI. How can I help you today? Ask me anything about Majdi’s experience, skills, projects, or certifications!'
    }
  ]);

  quickQuestions: string[] = [
    'What are Majdi’s key certifications?',
    'Tell me about the Smart Recruit project.',
    'What is Majdi’s DevOps experience?',
    'How can I contact Majdi?'
  ];

  constructor(private chatbotService: ChatbotService) {}

  toggleChat(): void {
    this.isOpen.set(!this.isOpen());
    if (this.isOpen()) {
      setTimeout(() => this.scrollToBottom(), 100);
    }
  }

  sendQuickQuestion(question: string): void {
    this.userInput.set(question);
    this.sendMessage();
  }

  async sendMessage(): Promise<void> {
    const text = this.userInput().trim();
    if (!text || this.isTyping()) return;

    // Push user message
    const updatedMessages = [
      ...this.messages(),
      { role: 'user' as const, content: text }
    ];
    this.messages.set(updatedMessages);
    this.userInput.set('');
    this.isTyping.set(true);

    setTimeout(() => this.scrollToBottom(), 50);

    // Create empty assistant response
    const assistantIndex = updatedMessages.length;
    this.messages.set([
      ...updatedMessages,
      { role: 'assistant', content: '' }
    ]);

    try {
      const history = updatedMessages.filter(m => m.role === 'user' || m.role === 'assistant');
      const stream = this.chatbotService.streamChat(history);

      let accumulatedContent = '';

      for await (const chunk of stream) {
        if (chunk.content) {
          accumulatedContent += chunk.content;
          const current = [...this.messages()];
          current[assistantIndex] = {
            ...current[assistantIndex],
            content: accumulatedContent
          };
          this.messages.set(current);
          this.scrollToBottom();
        }
      }
    } catch (err: any) {
      const current = [...this.messages()];
      current[assistantIndex] = {
        role: 'assistant',
        content: `I'm currently unable to process your request. Feel free to reach out to Majdi directly at contact@majdizamiti.com!`
      };
      this.messages.set(current);
    } finally {
      this.isTyping.set(false);
      this.scrollToBottom();
    }
  }

  private scrollToBottom(): void {
    try {
      if (this.scrollContainer?.nativeElement) {
        this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
      }
    } catch {}
  }
}
