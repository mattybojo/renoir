import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { AppService } from '../app.service';
import { TodoItem } from './todo-list.beans';
import * as firestore from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  constructor(private db: Firestore, private appService: AppService) { }

  getTodoItems(): Observable<TodoItem[]> {
    const todoListRef = collection(this.db, 'todoList');
    return collectionData(todoListRef, { idField: 'id' }) as Observable<TodoItem[]>;
  }

  // If an id is present, this item must exist in the DB
  saveTodoItem(todoItem: TodoItem): Observable<any> {
    const newDate = new Date();
    todoItem.dateModified = firestore.Timestamp.fromDate(newDate);
    if (todoItem.id) {
      const todoListDocRef = doc(this.db, `todoList/${todoItem.id}`);
      return from(updateDoc(todoListDocRef, this.appService.stripFirestoreId(todoItem)));
    } else {
      todoItem.dateCreated = firestore.Timestamp.fromDate(newDate);
      const todoListRef = collection(this.db, 'todoList');
      return from(addDoc(todoListRef, todoItem));
    }
  }

  deleteTodoItem(todoItem: TodoItem): Observable<void> {
    const todoListDocRef = doc(this.db, `todoList/${todoItem.id}`);
    return from(deleteDoc(todoListDocRef));
  }
}
