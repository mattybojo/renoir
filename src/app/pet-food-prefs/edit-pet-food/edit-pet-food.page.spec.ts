import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditPetFoodPage } from './edit-pet-food.page';

describe('EditPetFoodPage', () => {
  let component: EditPetFoodPage;
  let fixture: ComponentFixture<EditPetFoodPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPetFoodPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
