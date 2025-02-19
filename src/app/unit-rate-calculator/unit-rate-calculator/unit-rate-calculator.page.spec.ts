import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UnitRateCalculatorPage } from './unit-rate-calculator.page';

describe('UnitRateCalculatorPage', () => {
  let component: UnitRateCalculatorPage;
  let fixture: ComponentFixture<UnitRateCalculatorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitRateCalculatorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
