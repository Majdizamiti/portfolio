import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  templateUrl: './about.html',
  styleUrl: './about.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {
  readonly name = 'Majdi Zamiti';

  // Data model: add or remove skills here, no template edits needed
  readonly skills: readonly string[] = [
    'Linux administration',
    'Ansible',
    'Docker',
    'Kubernetes',
    'CI/CD pipelines',
  ];
}