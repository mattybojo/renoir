import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LostAndFoundItemFormComponent } from './lost-and-found-item-form.component';

describe('LostAndFoundItemFormComponent', () => {
  let component: LostAndFoundItemFormComponent;
  let fixture: ComponentFixture<LostAndFoundItemFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LostAndFoundItemFormComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LostAndFoundItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
