import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Certification {
  code: string;
  title: string;
  fullTitle: string;
  issuer: string;
  date: string;
  certLink?: string;
  logo: string;
  upcoming?: boolean;
}

@Component({
  selector: 'app-certifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './certifications.html',
  styleUrls: ['./certifications.css'],
})
export class Certifications {
  readonly certifications: Certification[] = [
    {
      code: 'NVIDIA',
      title: 'NVIDIA GenAI',
      fullTitle: 'NVIDIA Certified Associate — LLMs and Generative AI',
      issuer: 'NVIDIA',
      date: 'Coming 2026',
      logo: 'https://cdn.simpleicons.org/nvidia/76B900',
      upcoming: true,
    },
    {
      code: 'CKAD',
      title: 'CKAD Kubernetes',
      fullTitle: 'Certified Kubernetes Application Developer',
      issuer: 'CNCF',
      date: 'Coming 2026',
      logo: 'https://cdn.simpleicons.org/kubernetes/326CE5',
      upcoming: true,
    },
    {
      code: 'TF-004',
      title: 'Terraform Assoc.',
      fullTitle: 'HashiCorp Certified: Terraform Associate (004)',
      issuer: 'HashiCorp',
      date: 'Coming 2026',
      logo: 'https://cdn.simpleicons.org/terraform/7B42BC',
      upcoming: true,
    },
    {
      code: 'RHCD',
      title: 'RHCD Cloud',
      fullTitle: 'Red Hat Certified Developer in Cloud-native Applications',
      issuer: 'Red Hat',
      date: 'Sep 2026',
      certLink: 'https://www.redhat.com/en/services/certification',
      logo: 'https://cdn.simpleicons.org/redhat/EE0000',
    },
    {
      code: 'RHCA',
      title: 'RHCA Ansible',
      fullTitle: 'Red Hat Certified Advanced System Administrator in Ansible',
      issuer: 'Red Hat',
      date: 'Feb 2026',
      certLink: 'https://www.redhat.com/en/services/certification',
      logo: 'https://cdn.simpleicons.org/redhat/EE0000',
    },
    {
      code: 'RHCE',
      title: 'RHCE',
      fullTitle: 'Red Hat Certified Engineer',
      issuer: 'Red Hat',
      date: '2025',
      certLink: 'https://www.redhat.com/en/services/certification',
      logo: 'https://cdn.simpleicons.org/redhat/EE0000',
    },
    {
      code: 'RHCSA',
      title: 'RHCSA',
      fullTitle: 'Red Hat Certified System Administrator',
      issuer: 'Red Hat',
      date: '2024',
      certLink: 'https://www.redhat.com/en/services/certification',
      logo: 'https://cdn.simpleicons.org/redhat/EE0000',
    },
    {
      code: 'PCAP',
      title: 'PCAP',
      fullTitle: 'Python Certified Associate Programmer',
      issuer: 'Python Institute',
      date: '2024',
      certLink: 'https://pythoninstitute.org/pcap',
      logo: 'https://cdn.simpleicons.org/python/3776AB',
    },
  ];
}
