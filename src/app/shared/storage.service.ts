import { Injectable } from '@angular/core';
import { GetResult, Storage } from '@capacitor/storage';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setData(key: string, value: string): Observable<void> {
    return from(Storage.set({
      key,
      value,
    }));
  };

  getData(key: string): Observable<GetResult> {
    return from(Storage.get({ key }));
  };

  removeData(key: string): Observable<void> {
    return from(Storage.remove({ key }));
  };
}
