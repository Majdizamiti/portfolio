import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface SkillCategory {
  title: string;
  icon: string;
  skills: string[];
}

@Component({
  selector: 'app-tech-stack',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tech-stack.html',
  styleUrl: './tech-stack.css',
})
export class TechStack {
  readonly categories: SkillCategory[] = [
    {
      title: 'DevOps & Infrastructure',
      icon: '⚙️',
      skills: [
        'Red Hat Enterprise Linux',
        'Ansible Automation',
        'Docker',
        'Kubernetes',
        'Prometheus',
        'CI/CD Pipelines',
      ],
    },
    {
      title: 'Backend Development',
      icon: '🛠️',
      skills: [
        'Java',
        'Spring Boot',
        'Node.js',
        'Express',
        'REST APIs',
        'Microservices',
      ],
    },
    {
      title: 'Frontend Development',
      icon: '🎨',
      skills: [
        'Angular 21',
        'React',
        'TypeScript',
        'Tailwind CSS',
        'Redux',
        'HTML5',
        'CSS3',
      ],
    },
    {
      title: 'Mobile Development',
      icon: '📱',
      skills: [
        'Flutter',
        'Android Studio (Java, XML)',
      ],
    },
    {
      title: 'Databases & Cloud',
      icon: '🗄️',
      skills: [
        'PostgreSQL',
        'MariaDB',
        'MySQL',
        'MongoDB',
        'Firebase Realtime DB',
      ],
    },
    {
      title: 'Workflow & AI',
      icon: '🤖',
      skills: [
        'n8n Workflows',
        'Webhooks',
        'REST Integrations',
        'World Bank API',
      ],
    },
  ];
}
