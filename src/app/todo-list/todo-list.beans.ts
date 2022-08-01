import * as firestore from '@angular/fire/firestore';
import { FirestoreId } from '../app.beans';

export interface TodoItem extends FirestoreId {
  [x: string]: any;
  title: string;
  body: string;
  dateCreated: firestore.Timestamp;
  dateModified: firestore.Timestamp;
  dueDate: firestore.Timestamp;
}
