import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface PortfolioProject {
  title: string;
  description: string;
  techStack: string[];
  githubLink?: string;
  liveLink?: string;
  icon: string;
  status: 'Completed' | 'In Progress';
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
      title: 'Smart Recruit',
      description: 'A microservices-based recruitment management platform designed to automate candidate tracking, job postings, and hiring workflows using scalable distributed services and real-time monitoring.',
      techStack: ['React', 'SpringBoot', 'MariaDB', 'PostgreSQL', 'Kubernetes', 'Docker', 'Prometheus'],
      githubLink: 'https://github.com/fadihajji1/SmartRecruit---server',
      liveLink: '#',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg',
      status: 'In Progress'
    },
    {
      title: 'React Frontend Application',
      description: 'A dynamic, high-performance single-page application built with React, focusing on delivering a seamless and interactive user experience.',
      techStack: ['React', 'TypeScript', 'Tailwind', 'Redux'],
      githubLink: 'https://github.com/Majdizamiti/Delivery_optimization_System',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
      status: 'Completed'
    },
    {
      title: 'Workflow Automation with n8n',
      description: 'Complex business process automation and data pipeline synchronization using n8n self-hosted workflows and external API integrations.',
      techStack: ['n8n', 'Webhooks', 'REST APIs', 'PostgreSQL'],
      githubLink: 'https://github.com/Majdizamiti/N8N-JournalWriteBot',
      icon: 'https://cdn.simpleicons.org/n8n/FF6666',
      status: 'Completed'
    },
    {
      title: 'Node.js Backend Service',
      description: 'A robust and scalable RESTful API backend handling authentication, data processing, and serving the frontend application seamlessly.',
      techStack: ['Node.js', 'Express', 'MongoDB', 'JWT'],
      githubLink: 'https://github.com/fadihajji1/RecouvraApi',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
      status: 'Completed'
    },
    {
      title: 'Smart Irrigation App',
      description: 'A smart irrigation system (software , hardware) that control sensors and actors using mobile application.',
      techStack: ['Android Studio', 'JAVA', 'XML', 'NODEMCU ESP8266', 'FIREBASE'],
      githubLink: 'https://github.com/Majdizamiti/Smart_Irrigation_System',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/androidstudio/androidstudio-original.svg',
      status: 'Completed'
    },
    {
      title: 'Islamic App',
      description: 'A mobile application for accessing Islamic content and resources.',
      techStack: ['Android Studio', 'JAVA', 'XML', 'FIREBASE'],
      githubLink: 'https://github.com/Majdizamiti/islamic_app',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/androidstudio/androidstudio-original.svg',
      status: 'Completed'
    },
    {
      title: 'Ecommerce Dashboard Admin Panel',
      description: 'A comprehensive e-commerce administration panel for managing products, orders, users, and store analytics.',
      techStack: ['Angular', 'Springboot', 'Mysql', 'Kubernetes'],
      githubLink: 'https://github.com/Majdizamiti/E-commerce',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg',
      status: 'Completed'
    }
  ];

  getThemeClass(proj: PortfolioProject): string {
    const titleLower = proj.title.toLowerCase();

    if (titleLower.includes('recruit')) {
      return 'theme-smartrecruit';
    }
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
