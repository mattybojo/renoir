import { Injectable } from '@angular/core';
import { GetResult, Preferences } from '@capacitor/preferences';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setData(key: string, value: string): Observable<void> {
    return from(Preferences.set({
      key,
      value,
    }));
  };

  getData(key: string): Observable<GetResult> {
    return from(Preferences.get({ key }));
  };

  removeData(key: string): Observable<void> {
    return from(Preferences.remove({ key }));
  };
}
