import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-certification-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './certification-card.html',
  styleUrls: ['./certification-card.css'],
  animations: [
    trigger('cardAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('600ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        )
      ])
    ])
  ]
})
export class CertificationCardComponent {
  @Input() title!: string;
  @Input() fullTitle!: string;
  @Input() issuer!: string;
  @Input() date!: string;
  @Input() credentialId!: string;
  @Input() icon!: string;

  get themeClass(): string {
    const issuerLower = this.issuer?.toLowerCase() || '';
    if (issuerLower.includes('red hat')) {
      return 'theme-redhat';
    }
    if (issuerLower.includes('python')) {
      return 'theme-python';
    }
    return 'theme-default';
  }
}
