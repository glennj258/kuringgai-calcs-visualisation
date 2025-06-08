import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HousingShowcaseComponent } from './housing-showcase.component';

describe('HousingShowcaseComponent', () => {
  let component: HousingShowcaseComponent;
  let fixture: ComponentFixture<HousingShowcaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HousingShowcaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HousingShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
