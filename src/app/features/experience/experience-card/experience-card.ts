import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { ExperienceItem } from '../experience';

const monthYear = new Intl.DateTimeFormat('en', {
  month: '2-digit',
  year: 'numeric',
  timeZone: 'UTC',
});

const format = (ym: string): string => {
  const [y, m] = ym.split('-').map(Number);
  return monthYear.format(new Date(Date.UTC(y, m - 1)));   // "06/2026"
};

@Component({
  selector: 'app-experience-card',
  standalone: true,
  templateUrl: './experience-card.html',
  styleUrl: './experience-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceCard {
  readonly item = input.required<ExperienceItem>();

  readonly startLabel = computed(() => format(this.item().start));
  readonly endLabel = computed(() => {
    const end = this.item().end;
    return end ? format(end) : 'Present';
  });
}