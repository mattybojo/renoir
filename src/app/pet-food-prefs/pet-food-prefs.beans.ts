export interface PetFood {
  id?: string;
  brand: string;
  name: string;
  prefs: PetFoodPrefs;
  displayName: string;
}

export interface PetFoodPrefs {
  simba: number;
  rory: number;
  willy: number;
  milo: number;
  avg: number;
}

export interface PetFoodRating {
  label: string;
  rating: number;
}

export type PetFoodFilterType = 'name' | 'like';
