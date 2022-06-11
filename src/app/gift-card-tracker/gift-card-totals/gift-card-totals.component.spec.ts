import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GiftCardTotalsComponent } from './gift-card-totals.component';

describe('GiftCardTotalsComponent', () => {
  let component: GiftCardTotalsComponent;
  let fixture: ComponentFixture<GiftCardTotalsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GiftCardTotalsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GiftCardTotalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
