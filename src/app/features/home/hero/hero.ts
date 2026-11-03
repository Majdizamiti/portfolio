import {
  ChangeDetectionStrategy, Component, DestroyRef, ElementRef,
  afterNextRender, inject, input, signal,
} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

type Phase = 'typing' | 'holding' | 'deleting' | 'done';

const TYPE_MS = 70;
const DELETE_MS = 35;
const HOLD_MS = 1600;

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {
  readonly name = input('Majdi Zamiti');
  readonly roles = input<readonly string[]>([
    'DevOps Engineer',
    'Linux Specialist',
    'Full-Stack Developer',
  ]);
  readonly loop = input(true);
  readonly cvUrl = input('assets/cv.pdf');

  readonly typed = signal('');
  readonly announced = signal('');
  readonly reducedMotion = signal(false);

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  private roleIndex = 0;
  private phase: Phase = 'typing';
  private inView = false;
  private timer?: ReturnType<typeof setTimeout>;

  constructor() {
    afterNextRender(() => {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      this.reducedMotion.set(mq.matches);

      if (mq.matches) {
        const first = this.roles()[0] ?? 'DevOps Engineer';
        this.typed.set(first);
        this.announced.set(first);
        return;
      }

      const io = new IntersectionObserver(([entry]) => {
        this.inView = entry.isIntersecting;
        this.inView ? this.schedule(0) : this.clear();
      }, { threshold: 0.2 });
      io.observe(this.host.nativeElement);

      this.destroyRef.onDestroy(() => { io.disconnect(); this.clear(); });
    });
  }

  scrollTo(event: Event, id: string): void {
    event.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({
      behavior: this.reducedMotion() ? 'auto' : 'smooth',
      block: 'start',
    });
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
    history.replaceState(null, '', `#${id}`);
  }

  private schedule(ms: number): void {
    this.clear();
    if (!this.inView || this.phase === 'done') return;
    this.timer = setTimeout(() => this.tick(), ms);
  }

  private clear(): void {
    if (this.timer) clearTimeout(this.timer);
    this.timer = undefined;
  }

  private tick(): void {
    const roles = this.roles();
    if (!roles.length) return;
    const full = roles[this.roleIndex];
    const current = this.typed();

    switch (this.phase) {
      case 'typing':
        if (current.length < full.length) {
          this.typed.set(full.slice(0, current.length + 1));
          return this.schedule(TYPE_MS);
        }
        this.announced.set(full);
        if (this.roleIndex === roles.length - 1 && !this.loop()) {
          this.phase = 'done';
          return;
        }
        this.phase = 'holding';
        return this.schedule(HOLD_MS);

      case 'holding':
        this.phase = 'deleting';
        return this.schedule(0);

      case 'deleting':
        if (current.length > 0) {
          this.typed.set(current.slice(0, -1));
          return this.schedule(DELETE_MS);
        }
        this.roleIndex = (this.roleIndex + 1) % roles.length;
        this.phase = 'typing';
        return this.schedule(TYPE_MS);
    }
  }
}
