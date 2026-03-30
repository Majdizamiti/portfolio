import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
}

@Component({
  selector: 'app-experience',
  imports: [CommonModule],
  templateUrl: './experience.html',
  styleUrls: ['./experience.css'],
  standalone: true
})
export class Experience {
  experiences: ExperienceItem[] = [
    {
      role: 'Project Intern',
      company: 'Coworky',
      period: '08/2025 – 09/2025',
      description: 'An advanced n8n workflow that acts as an AI-powered research assistant for journalists. It processes queries via WhatsApp (text, audio, or image), fetches economic data from the World Bank, performs web research, and delivers a synthesized summary with source citations and a confidence level.',
      technologies: ['N8N', 'HTML', 'CSS', 'JavaScript', 'World Bank API']
    },
    {
      role: 'Intern',
      company: 'ISSAT Kairouan',
      period: '02/2023 – 05/2023',
      description: 'End of study project titled "smart irrigation system that control sensors and actors using mobile application"',
      technologies: ['JAVA', 'XML', 'NODEMCU ESP8266', 'FIREBASE']
    }
  ];
}
