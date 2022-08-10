import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private data$: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor() { }

  getDataObs(): Observable<any> {
    return this.data$.asObservable();
  }

  setDataObs(data: any): void {
    this.data$.next(data);
  }
}
