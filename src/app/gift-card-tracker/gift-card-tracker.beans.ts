import { FirestoreId } from '../app.beans';

export interface GiftCard extends FirestoreId {
  [x: string]: any;
  storeName: string;
  amount: number;
  last4?: number;
}
