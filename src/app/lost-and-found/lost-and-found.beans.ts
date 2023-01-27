import * as firestore from '@angular/fire/firestore';
import { FirestoreId } from '../app.beans';

export interface LostAndFoundItem extends FirestoreId {
  [x: string]: any;
  dateCreated: firestore.Timestamp;
  dateModified: firestore.Timestamp;
  name: string;
  location: string;
}
