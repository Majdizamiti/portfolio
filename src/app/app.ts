import { Component } from '@angular/core';
import { NavbarComponent } from './layout/navbar/navbar';
import { HeroComponent } from './features/home/hero/hero';
import { AboutComponent } from './features/about/about';
import { Experience } from './features/experience/experience';
import { Project } from './project/project';
import { Certifications } from './features/certifications/certifications';
import { DownloadCvComponent } from './features/cv/cv';
import { FooterComponent } from './layout/footer/footer';

@Component({
  selector: 'app-root',
  template: `
  <app-navbar></app-navbar>
  <app-hero></app-hero>
  <app-about></app-about>
  <app-experience></app-experience>
  <app-project></app-project>
  <app-certifications></app-certifications>
  <app-download-cv></app-download-cv>
  <app-footer></app-footer>
`,
  styleUrls: ['./app.css'],
  standalone: true,
  imports: [
    NavbarComponent,
    HeroComponent,
    AboutComponent,
    Experience,
    Project,
    Certifications,
    DownloadCvComponent,
    FooterComponent
  ]
})
export class AppComponent {}

