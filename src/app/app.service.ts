import { FirestoreId } from './app.beans';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }

  stripFirestoreId<T extends FirestoreId>(item: T): T {
    const itemCopy = Object.assign({}, item);
    delete itemCopy.id;
    return itemCopy;
  }
}
