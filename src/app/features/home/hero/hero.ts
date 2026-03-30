import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.html',
  styleUrls: ['./hero.css']
})
export class HeroComponent implements OnInit {

  roles: string[] = [
    'DevOps Engineer',
    'RHCE Certified',
    'Linux Specialist',
    'Automation Enthusiast'
  ];

  displayedRole = '';
  roleIndex = 0;
  charIndex = 0;

  ngOnInit() {
    this.typeEffect();
  }

  scrollTo(sectionId: string) {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  typeEffect() {
    const currentRole = this.roles[this.roleIndex];

    if (this.charIndex < currentRole.length) {
      this.displayedRole += currentRole.charAt(this.charIndex);
      this.charIndex++;
      setTimeout(() => this.typeEffect(), 60);
    } else {
      setTimeout(() => {
        this.displayedRole = '';
        this.charIndex = 0;
        this.roleIndex = (this.roleIndex + 1) % this.roles.length;
        this.typeEffect();
      }, 1500);
    }
  }
}
