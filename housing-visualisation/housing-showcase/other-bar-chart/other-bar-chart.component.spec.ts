import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherBarChartComponent } from './other-bar-chart.component';

describe('OtherBarChartComponent', () => {
  let component: OtherBarChartComponent;
  let fixture: ComponentFixture<OtherBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtherBarChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtherBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
