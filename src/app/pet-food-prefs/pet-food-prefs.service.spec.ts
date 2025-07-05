import { TestBed } from '@angular/core/testing';

import { PetFoodPrefsService } from './pet-food-prefs.service';

describe('PetFoodPrefsService', () => {
  let service: PetFoodPrefsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PetFoodPrefsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
