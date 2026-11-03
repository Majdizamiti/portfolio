import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ExperienceCard } from './experience-card/experience-card';

export interface ExperienceItem {
  role: string;
  company: string;
  start: string;          // 'YYYY-MM'
  end?: string;           // omit for "Present"
  description: string;
  technologies: readonly string[];
  logo?: string;
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [ExperienceCard],
  templateUrl: './experience.html',
  styleUrl: './experience.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Experience {
  readonly experiences: readonly ExperienceItem[] = [
    {
      role: 'Software Engineering Intern',
      company: 'Coworky',
      start: '2026-06',
      end: '2026-08',
      description:
        'A delivery platform with a mobile app for drivers, an administrator dashboard and AI services to categorize products, check vehicle capacity and optimize loading. It integrates geolocation, real-time tracking and route optimization to improve the efficiency of delivery operations.',
      technologies: ['Spring Boot', 'React', 'Flutter', 'PostgreSQL'],
      logo: 'https://www.coworky.org/favicon.ico',
    },
    {
      role: 'Project Intern',
      company: 'Coworky',
      start: '2025-08',
      end: '2025-09',
      description:
        'An advanced n8n workflow acting as an AI-powered research assistant for journalists. It processes queries via WhatsApp (text, audio or image), fetches economic data from the World Bank, performs web research, and returns a synthesized summary with source citations and a confidence level.',
      technologies: ['n8n', 'HTML', 'CSS', 'JavaScript', 'World Bank API'],
      logo: 'https://www.coworky.org/favicon.ico',
    },
    {
      role: 'Intern',
      company: 'ISSAT Kairouan',
      start: '2023-02',
      end: '2023-05',
      description:
        'End-of-study project: a smart irrigation system controlling sensors and actuators from a mobile application.',
      technologies: ['Java', 'XML', 'NodeMCU ESP8266', 'Firebase'],
      logo: 'assets/images-removebg-preview.png',
    },
  ];
}
