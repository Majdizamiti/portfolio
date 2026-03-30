import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CertificationCardComponent } from './certification-card/certification-card';

interface Certification {
  title: string;
  fullTitle: string;
  issuer: string;
  date: string;
  credentialId: string;
  icon: string;
}

@Component({
  selector: 'app-certifications',
  standalone: true,
  imports: [CommonModule, CertificationCardComponent],
  template: `
    <section id="certifications" class="section">
      <div class="certs-container">
        <h2 class="section-title">Certifications</h2>
        <p class="section-subtitle">Industry-recognized credentials that validate my expertise</p>

        <div class="grid">
          <app-certification-card
            *ngFor="let cert of certifications"
            [title]="cert.title"
            [fullTitle]="cert.fullTitle"
            [issuer]="cert.issuer"
            [date]="cert.date"
            [credentialId]="cert.credentialId"
            [icon]="cert.icon">
          </app-certification-card>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .section {
      padding: var(--section-padding);
      background: var(--bg-secondary);
      position: relative;
    }

    .section::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, var(--border-accent), transparent);
    }

    .certs-container {
      max-width: var(--container-max);
      margin: 0 auto;
    }

    .grid {
      margin-top: 1rem;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 1.5rem;
    }
  `]
})
export class Certifications {

  certifications: Certification[] = [
    {
      title: 'RHCSA',
      fullTitle: 'Red Hat Certified System Administrator',
      issuer: 'Red Hat',
      date: '2024',
      credentialId: 'XXXX-XXXX',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redhat/redhat-original.svg'
    },
    {
      title: 'RHCE',
      fullTitle: 'Red Hat Certified Engineer',
      issuer: 'Red Hat',
      date: '2025',
      credentialId: 'YYYY-YYYY',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redhat/redhat-original.svg'
    },
    {
      title: 'PCAP',
      fullTitle: 'Certified Associate in Python Programming',
      issuer: 'Python Institute',
      date: '2024',
      credentialId: 'ZZZZ-ZZZZ',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg'
    }
  ];

}
