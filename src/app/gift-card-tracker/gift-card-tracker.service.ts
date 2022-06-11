import { Injectable } from '@angular/core';
import {
  addDoc, collection, collectionData, deleteDoc, doc, DocumentData,
  DocumentReference, Firestore, updateDoc
} from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { AppService } from '../app.service';
import { GiftCard } from './gift-card-tracker.beans';

@Injectable({
  providedIn: 'root'
})
export class GiftCardTrackerService {

  constructor(private db: Firestore, private appService: AppService) { }

  getGiftCards(): Observable<GiftCard[]> {
    const giftCardsRef = collection(this.db, 'giftCards');
    return collectionData(giftCardsRef, { idField: 'id' }) as Observable<GiftCard[]>;
  }

  addGiftCard(giftCard: GiftCard): Observable<DocumentReference<DocumentData>> {
    const giftCardsRef = collection(this.db, 'giftCards');
    return from(addDoc(giftCardsRef, giftCard));
  }

  updateGiftCard(giftCard: GiftCard): Observable<void> {
    const giftCardDocRef = doc(this.db, `giftCards/${giftCard.id}`);
    return from(updateDoc(giftCardDocRef, this.appService.stripFirestoreId(giftCard)));
  }

  deleteGiftCard(giftCard: GiftCard): Observable<void> {
    const giftCardDocRef = doc(this.db, `giftCards/${giftCard.id}`);
    return from(deleteDoc(giftCardDocRef));
  }
}
