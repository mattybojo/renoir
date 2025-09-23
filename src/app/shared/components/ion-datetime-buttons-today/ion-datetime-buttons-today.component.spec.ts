import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { IonDatetimeButtonsTodayComponent } from './ion-datetime-buttons-today.component';

describe('IonDatetimeButtonsTodayComponent', () => {
  let component: IonDatetimeButtonsTodayComponent;
  let fixture: ComponentFixture<IonDatetimeButtonsTodayComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [IonDatetimeButtonsTodayComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IonDatetimeButtonsTodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
