import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PetFoodListPage } from './pet-food-list.page';

describe('PetFoodListPage', () => {
  let component: PetFoodListPage;
  let fixture: ComponentFixture<PetFoodListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PetFoodListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
