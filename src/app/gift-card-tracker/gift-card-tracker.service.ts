import { Injectable } from '@angular/core';
import { AddDocumentResult, DocumentData, FirebaseFirestore, GetCollectionResult } from '@capacitor-firebase/firestore';
import { from, map, Observable, of } from 'rxjs';
import { mapIdToObject } from '../app.helpers';
import { GiftCard } from './gift-card-tracker.beans';

@Injectable({
  providedIn: 'root'
})
export class GiftCardTrackerService {

  readonly COLLECTION_NAME: string = 'giftCards';

  constructor() { }

  getGiftCards(): Observable<GiftCard[]> {
    return from(FirebaseFirestore.getCollection({
      reference: this.COLLECTION_NAME,
    })).pipe(map(((result: GetCollectionResult<DocumentData>) => mapIdToObject<GiftCard>(result))));
  }

  saveGiftCard(giftCard: GiftCard): Observable<AddDocumentResult | void> {
    if (!!giftCard.id) {
      return from(FirebaseFirestore.setDocument({
        reference: `${this.COLLECTION_NAME}/${giftCard.id}`,
        data: giftCard
      }));
    } else {
      return from(FirebaseFirestore.addDocument({
        reference: this.COLLECTION_NAME,
        data: giftCard
      }));
    }
  }

  deleteGiftCard(giftCard: GiftCard): Observable<void> {
    return from(FirebaseFirestore.deleteDocument({
      reference: `${this.COLLECTION_NAME}/${giftCard.id}`,
    }));
  }
}
