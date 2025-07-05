import { PetFood, PetFoodRating } from './pet-food-prefs.beans';

export const createPetFood = (): PetFood => {
  return {
    brand: '',
    displayName: '',
    name: '',
    prefs: {
      simba: -1,
      rory: -1,
      willy: -1,
      milo: -1,
      avg: -1
    }
  };
}

export const createPetFoodRatings = (): PetFoodRating[] => {
  return [{
    label: 'Love',
    rating: 2
  }, {
    label: 'Like',
    rating: 1
  }, {
    label: 'Hate',
    rating: 0
  }];
}
