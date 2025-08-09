import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GiftCardListPage } from './gift-card-list.page';

describe('GiftCardListPage', () => {
  let component: GiftCardListPage;
  let fixture: ComponentFixture<GiftCardListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftCardListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
