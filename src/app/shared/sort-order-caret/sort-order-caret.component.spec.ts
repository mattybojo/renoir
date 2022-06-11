import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SortOrderCaretComponent } from './sort-order-caret.component';

describe('SortOrderCaretComponent', () => {
  let component: SortOrderCaretComponent;
  let fixture: ComponentFixture<SortOrderCaretComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SortOrderCaretComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SortOrderCaretComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
