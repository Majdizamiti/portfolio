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
      <h2>Certifications</h2>

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
    </section>
  `,
  styles: [`
    .section {
      padding: 6rem 3rem;
      background: #0f172a;
      color: white;
      text-align: center;
    }

    .grid {
      margin-top: 40px;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 30px;
    }

    h2 {
      font-size: 2rem;
      margin-bottom: 20px;
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
      icon: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@latest/icons/redhat.svg'
    },
    {
      title: 'RHCE',
      fullTitle: 'Red Hat Certified Engineer',
      issuer: 'Red Hat',
      date: '2025',
      credentialId: 'YYYY-YYYY',
      icon: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@latest/icons/redhat.svg'
    },
    {
      title: 'PCAP',
      fullTitle: 'Python Certified Associate Programmer',
      issuer: 'Python Institute',
      date: '2024',
      credentialId: 'ZZZZ-ZZZZ',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg'
    }
  ];

}
