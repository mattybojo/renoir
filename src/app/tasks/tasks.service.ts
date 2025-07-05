import { inject, Injectable } from '@angular/core';
import { AddDocumentResult, FirebaseFirestore, GetCollectionResult } from '@capacitor-firebase/firestore';
import { DocumentData } from 'firebase/firestore';
import { from, map, Observable } from 'rxjs';
import { mapIdToObject } from '../app.helpers';
import { AuthService } from '../auth/auth.service';
import { Category, Task } from './tasks.beans';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  readonly COLLECTION_NAME: string = 'tasks';

  // DI
  private authService = inject(AuthService);

  constructor() { }

  getTasks(): Observable<Task[]> {
    return from(FirebaseFirestore.getCollection({
      reference: this.COLLECTION_NAME,
      compositeFilter: {
        type: 'and',
        queryConstraints: [
          this.authService.whereSharedWithCurrentUser
        ]
      },
      queryConstraints: [
        {
          type: 'orderBy',
          fieldPath: 'sortOrder',
          directionStr: 'asc',
        },
      ]
    })).pipe(map(((result: GetCollectionResult<DocumentData>) => mapIdToObject<Task>(result))));
  }

  getCategories(): Observable<Category[]> {
    return from(FirebaseFirestore.getCollection({
      reference: 'categories',
      compositeFilter: {
        type: 'and',
        queryConstraints: [
          this.authService.whereSharedWithCurrentUser
        ]
      },
      queryConstraints: [
        {
          type: 'orderBy',
          fieldPath: 'sortOrder',
          directionStr: 'asc',
        },
      ]
    })).pipe(map(((result: GetCollectionResult<DocumentData>) => mapIdToObject<Category>(result))));
  }

  updateTasks(tasks: Task[]): any {
    const promises: Promise<any>[] = [];
    tasks.forEach((task: Task) => {
      promises.push(
        FirebaseFirestore.setDocument({
          reference: `${this.COLLECTION_NAME}/${task.id}`,
          data: task
        }));
    });
    return from(Promise.all(promises));
  }

  saveTask(task: Task): Observable<AddDocumentResult | void> {
    if (!!task.id) {
      return from(FirebaseFirestore.setDocument({
        reference: `${this.COLLECTION_NAME}/${task.id}`,
        data: task
      }));
    } else {
      return from(FirebaseFirestore.addDocument({
        reference: this.COLLECTION_NAME,
        data: task
      }));
    }
  }

  deleteTask(task: Task): Observable<void> {
    return from(FirebaseFirestore.deleteDocument({
      reference: `${this.COLLECTION_NAME}/${task.id}`,
    }));
  }
}
