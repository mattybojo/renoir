import * as firestore from '@angular/fire/firestore';
import { FirestoreId } from '../app.beans';

export interface ShoppingListItem extends FirestoreId {
  [x: string]: any;
  dateCreated: firestore.Timestamp;
  dateModified: firestore.Timestamp;
  isShopped: boolean;
  name: string;
  quantity: number;
}

export interface OverlayEventDetail<T = ShoppingListItem> {
  data?: T;
  role?: string;
}
