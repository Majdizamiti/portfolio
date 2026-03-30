import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface PortfolioProject {
  title: string;
  description: string;
  techStack: string[];
  githubLink?: string;
  liveLink?: string;
  icon: string;
}

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project.html',
  styleUrls: ['./project.css'],
})
export class Project {
  projects: PortfolioProject[] = [
    {
      title: 'React Frontend Application',
      description: 'A dynamic, high-performance single-page application built with React, focusing on delivering a seamless and interactive user experience.',
      techStack: ['React', 'TypeScript', 'Tailwind', 'Redux'],
      githubLink: '#',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg'
    },
    {
      title: 'Workflow Automation with n8n',
      description: 'Complex business process automation and data pipeline synchronization using n8n self-hosted workflows and external API integrations.',
      techStack: ['n8n', 'Webhooks', 'REST APIs', 'PostgreSQL'],
      githubLink: '#',
      liveLink: '#',
      icon: 'https://cdn.simpleicons.org/n8n/FF6666'
    },
    {
      title: 'Node.js Backend Service',
      description: 'A robust and scalable RESTful API backend handling authentication, data processing, and serving the frontend application seamlessly.',
      techStack: ['Node.js', 'Express', 'MongoDB', 'JWT'],
      liveLink: '#',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg'
    },
    {
      title: 'Smart Irrigation App',
      description: 'A smart irrigation system (software , hardware) that control sensors and actors using mobile application.',
      techStack: ['Android Studio', 'JAVA', 'XML', 'NODEMCU ESP8266', 'FIREBASE'],
      githubLink: 'https://github.com/Majdizamiti/Smart_Irrigation_System',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/androidstudio/androidstudio-original.svg'
    }
  ];

  getThemeClass(proj: PortfolioProject): string {
    const titleLower = proj.title.toLowerCase();

    if (titleLower.includes('react')) {
      return 'theme-react';
    }
    if (titleLower.includes('n8n')) {
      return 'theme-n8n';
    }
    if (titleLower.includes('node')) {
      return 'theme-node';
    }
    if (titleLower.includes('irrigation')) {
      return 'theme-irrigation';
    }

    return 'theme-default';
  }
}
