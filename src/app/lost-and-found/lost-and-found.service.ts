import { Injectable } from '@angular/core';
import {
  addDoc, collection, collectionData, deleteDoc, doc,
  DocumentData, DocumentReference, Firestore, updateDoc
} from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { AppService } from '../app.service';
import * as firestore from '@angular/fire/firestore';
import { LostAndFoundItem } from './lost-and-found.beans';

@Injectable({
  providedIn: 'root'
})
export class LostAndFoundService {

  constructor(private db: Firestore, private appService: AppService) { }

  getLostAndFoundList(): Observable<LostAndFoundItem[]> {
    const lafRef = collection(this.db, 'lostAndFound');
    return collectionData(lafRef, { idField: 'id' }) as Observable<LostAndFoundItem[]>;
  }

  addItem(item: LostAndFoundItem): Observable<DocumentReference<DocumentData>> {
    const newDate = new Date();
    item.dateModified = firestore.Timestamp.fromDate(newDate);
    item.dateCreated = firestore.Timestamp.fromDate(newDate);
    const lafRef = collection(this.db, 'lostAndFound');
    return from(addDoc(lafRef, item));
  }

  updateItem(item: LostAndFoundItem): Observable<void> {
    item.dateModified = firestore.Timestamp.fromDate(new Date());
    const lafDocRef = doc(this.db, `lostAndFound/${item.id}`);
    return from(updateDoc(lafDocRef, this.appService.stripFirestoreId(item)));
  }

  deleteItem(item: LostAndFoundItem): Observable<void> {
    const lafDocRef = doc(this.db, `lostAndFound/${item.id}`);
    return from(deleteDoc(lafDocRef));
  }
}
