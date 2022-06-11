import { FirestoreId } from '../app.beans';
import * as firestore from '@angular/fire/firestore';

export interface ShoppingListItem extends FirestoreId {
  [x: string]: any;
  created: firestore.Timestamp;
  isShopped: boolean;
  name: string;
  quantity: number;
}

export interface OverlayEventDetail<T = ShoppingListItem> {
  data?: T;
  role?: string;
}
