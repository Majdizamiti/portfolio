import { Component } from '@angular/core';
import { NavbarComponent } from './layout/navbar/navbar';
import { HeroComponent } from './features/home/hero/hero';
import { AboutComponent } from './features/about/about';
import { TechStack } from './features/home/tech-stack/tech-stack';
import { Certifications } from './features/certifications/certifications';
import { Experience } from './features/experience/experience';
import { Project } from './project/project';
import { DownloadCvComponent } from './features/cv/cv';
import { FooterComponent } from './layout/footer/footer';
import { ChatbotComponent } from './shared/chatbot/chatbot';

@Component({
  selector: 'app-root',
  template: `
  <app-navbar></app-navbar>
  <app-hero></app-hero>
  <app-about></app-about>
  <app-tech-stack></app-tech-stack>
  <app-certifications></app-certifications>
  <app-experience></app-experience>
  <app-project></app-project>
  <app-download-cv></app-download-cv>
  <app-footer></app-footer>
  <app-chatbot></app-chatbot>
`,
  styleUrls: ['./app.css'],
  standalone: true,
  imports: [
    NavbarComponent,
    HeroComponent,
    AboutComponent,
    TechStack,
    Certifications,
    Experience,
    Project,
    DownloadCvComponent,
    FooterComponent,
    ChatbotComponent
  ]
})
export class AppComponent {}
