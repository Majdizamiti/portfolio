import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificationCardComponent } from './certification-card';

describe('CertificationCardComponent', () => {
  let component: CertificationCardComponent;
  let fixture: ComponentFixture<CertificationCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CertificationCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertificationCardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
