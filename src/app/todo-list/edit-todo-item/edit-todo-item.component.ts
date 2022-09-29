import { Component, OnDestroy, OnInit } from '@angular/core';
import * as firestore from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { HeaderAction } from 'src/app/header/header.beans';
import { SubSink } from 'subsink';
import { DataService } from './../../shared/data.service';
import { TodoItem } from './../todo-list.beans';
import { TodoListService } from './../todo-list.service';

@Component({
  selector: 'ren-edit-todo-item',
  templateUrl: './edit-todo-item.component.html',
  styleUrls: ['./edit-todo-item.component.scss'],
})
export class EditTodoItemComponent implements OnInit, OnDestroy {

  todoItem: TodoItem;
  headerActions: HeaderAction[];
  title: string;
  currentItem: TodoItem;
  todoItemForm: FormGroup;
  dueDate: firestore.Timestamp;

  private subs = new SubSink();

  constructor(private todoListService: TodoListService, private appService: AppService,
    private dataService: DataService) {
    this.subs.sink = this.dataService.getDataObs().subscribe((data: any) => {
      this.todoItem = data;
    });
  }

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

    this.headerActions = [{
      type: 'back',
      slot: 'start',
      icon: 'arrow-back-outline'
    }, {
      type: 'save',
      slot: 'start',
      icon: 'save',
      disabled: this.todoItemForm?.invalid
    }];

    this.subs.sink = this.todoItemForm.valueChanges.subscribe(() => {
      this.headerActions[1].disabled = this.todoItemForm.invalid;
    });
  }

  onDateChange($event): void {
    if (!!$event.detail.value) {
      this.dueDate = firestore.Timestamp.fromDate(new Date($event.detail.value));
    } else {
      this.dueDate = null;
    }
  }

  actionHandler(actionType: string) {
    switch (actionType) {
      case 'back':
        this.appService.goBack();
        break;
      case 'save':
        this.saveItem();
        break;
      default:
        console.error(`Unknown action type: ${actionType}`);
    }
  }

  saveItem(): void {
    this.currentItem = { ...this.todoItemForm.value, dueDate: this.dueDate };
    this.appService.presentLoadingModalSave();
    this.subs.sink = this.todoListService.saveTodoItem(this.currentItem).subscribe(() => {
      this.appService.dismissLoadingModal();
      this.appService.presentToast({
        color: 'success', message: 'Todo item saved successfully!', duration: 1000
      });
      this.appService.goBack();
    }, (err) => {
      this.appService.dismissLoadingModal();
      this.appService.presentToast({ color: 'danger', message: 'Error saving todo item!', duration: 1000 });
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
