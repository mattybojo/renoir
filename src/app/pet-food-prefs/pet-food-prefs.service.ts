import { Injectable } from '@angular/core';
import { AddDocumentResult, DocumentData, FirebaseFirestore, GetCollectionResult } from '@capacitor-firebase/firestore';
import { from, map, Observable } from 'rxjs';
import { mapIdToObject } from '../app.helpers';
import { PetFood } from './pet-food-prefs.beans';

@Injectable({
  providedIn: 'root'
})
export class PetFoodPrefsService {

  readonly COLLECTION_NAME: string = 'petFoodPrefs';

  constructor() { }

  getPetFoodPrefs(): Observable<PetFood[]> {
    return from(FirebaseFirestore.getCollection({
      reference: this.COLLECTION_NAME,
    })).pipe(map(((result: GetCollectionResult<DocumentData>) => mapIdToObject<PetFood>(result))));
  }

  savePetFood(petFood: PetFood): Observable<AddDocumentResult | void> {
    if (!!petFood.id) {
      return from(FirebaseFirestore.setDocument({
        reference: `${this.COLLECTION_NAME}/${petFood.id}`,
        data: petFood
      }));
    } else {
      return from(FirebaseFirestore.addDocument({
        reference: this.COLLECTION_NAME,
        data: petFood
      }));
    }
  }

  deletePetFood(petFood: PetFood): Observable<void> {
    return from(FirebaseFirestore.deleteDocument({
      reference: `${this.COLLECTION_NAME}/${petFood.id}`,
    }));
  }
}
