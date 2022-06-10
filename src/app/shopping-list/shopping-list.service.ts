import { Injectable } from '@angular/core';
import * as firestore from '@angular/fire/firestore';
import {
  addDoc, collection, collectionData, deleteDoc, doc,
  DocumentData, DocumentReference, Firestore, updateDoc
} from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { AppService } from './../app.service';
import { ShoppingListItem } from './shopping-list.beans';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  constructor(private db: Firestore, private appService: AppService) { }

  getShoppingList(): Observable<ShoppingListItem[]> {
    const notesRef = collection(this.db, 'shoppingList');
    return collectionData(notesRef, { idField: 'id' }) as Observable<ShoppingListItem[]>;
  }

  addItemToList(item: ShoppingListItem): Observable<DocumentReference<DocumentData>> {
    item.created = firestore.Timestamp.fromDate(new Date());
    const notesRef = collection(this.db, 'shoppingList');
    return from(addDoc(notesRef, item));
  }

  updateListItem(item: ShoppingListItem): Observable<void> {
    const noteDocRef = doc(this.db, `shoppingList/${item.id}`);
    return from(updateDoc(noteDocRef, this.appService.stripFirestoreId(item)));
  }

  deleteListItem(item: ShoppingListItem): Observable<void> {
    const noteDocRef = doc(this.db, `shoppingList/${item.id}`);
    return from(deleteDoc(noteDocRef));
  }
}
