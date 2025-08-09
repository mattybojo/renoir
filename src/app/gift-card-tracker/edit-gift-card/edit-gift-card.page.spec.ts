import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditGiftCardPage } from './edit-gift-card.page';

describe('EditGiftCardPage', () => {
  let component: EditGiftCardPage;
  let fixture: ComponentFixture<EditGiftCardPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGiftCardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
