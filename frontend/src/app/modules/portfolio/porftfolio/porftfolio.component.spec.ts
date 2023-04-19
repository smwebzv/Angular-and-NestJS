import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PorftfolioComponent } from './porftfolio.component';

describe('PorftfolioComponent', () => {
  let component: PorftfolioComponent;
  let fixture: ComponentFixture<PorftfolioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PorftfolioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PorftfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
