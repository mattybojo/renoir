import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import * as firestore from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Components } from '@ionic/core';
import { AppService } from 'src/app/app.service';
import { SubSink } from 'subsink';
import { TodoItem } from './../todo-list.beans';
import { TodoListService } from './../todo-list.service';

@Component({
  selector: 'ren-edit-todo-item',
  templateUrl: './edit-todo-item.component.html',
  styleUrls: ['./edit-todo-item.component.scss'],
})
export class EditTodoItemComponent implements OnInit, OnDestroy {

  @Input() todoItem: TodoItem;
  @Input() modal: Components.IonModal;

  title: string;
  currentItem: TodoItem;
  todoItemForm: FormGroup;
  dueDate: firestore.Timestamp;

  private subs = new SubSink();

  constructor(private todoListService: TodoListService, private appService: AppService) { }

  ngOnInit(): void {
    this.currentItem = Object.assign({}, this.todoItem);
    this.dueDate = this.todoItem?.dueDate ? this.todoItem.dueDate : null;
    if (!!this.todoItem) {
      this.title = `Editing Item`;
    } else {
      this.title = 'Add New Item';
    }

    this.todoItemForm = new FormGroup({
      id: new FormControl(this.currentItem?.id),
      title: new FormControl(this.currentItem?.title, [Validators.required]),
      body: new FormControl(this.currentItem?.body),
      dateCreated: new FormControl(this.currentItem.dateCreated),
      dateModified: new FormControl(this.currentItem.dateModified),
    });
  }

  onDateChange($event): void {
    if (!!$event.detail.value) {
      this.dueDate = firestore.Timestamp.fromDate(new Date($event.detail.value));
    } else {
      this.dueDate = null;
    }
    console.log(this.currentItem?.dueDate?.toDate().toISOString());
  }

  saveItem(): void {
    this.currentItem = { ...this.todoItemForm.value, dueDate: this.dueDate };
    this.appService.presentLoadingModalSave();
    this.subs.sink = this.todoListService.saveTodoItem(this.currentItem).subscribe(() => {
      this.modal.dismiss();
      this.appService.dismissLoadingModal();
      this.appService.presentToast({
        color: 'success', message: 'Todo item saved successfully!', duration: 1000
      });
    }, (err) => {
      this.appService.dismissLoadingModal();
      this.appService.presentToast({ color: 'danger', message: 'Error saving todo item!', duration: 1000 });
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
