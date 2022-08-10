import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ViewWillEnter } from '@ionic/angular';
import { SubSink } from 'subsink';
import { AppService } from '../app.service';
import { HeaderAction } from '../header/header.beans';
import { DataService } from '../shared/data.service';
import { TodoItem } from './todo-list.beans';
import { TodoListService } from './todo-list.service';

@Component({
  selector: 'ren-todo-list',
  templateUrl: './todo-list.page.html',
  styleUrls: ['./todo-list.page.scss'],
})
export class TodoListPage implements OnDestroy, ViewWillEnter {

  headerActions: HeaderAction[];
  todoItems: TodoItem[];

  private subs = new SubSink();

  constructor(private todoListService: TodoListService, private appService: AppService,
    private dataService: DataService, private router: Router) {
    this.headerActions = [{
      type: 'add',
      slot: 'start',
      icon: 'add'
    }];
  }

  ionViewWillEnter(): void {
    this.loadTodoListItems();
  }

  loadTodoListItems(): void {
    this.subs.sink = this.todoListService.getTodoItems().subscribe((todoItems: TodoItem[]) => {
      this.todoItems = todoItems;
    });
  }

  actionHandler(actionType: string): void {
    switch (actionType) {
      case 'add':
        this.dataService.setDataObs(undefined);
        this.router.navigate(['tabs/todo-list/edit']);
        break;
      default:
        console.error(`Unknown action type: ${actionType}`);
    }
  }

  updateItem(todoItem: TodoItem): void {
    this.dataService.setDataObs(todoItem);
    this.router.navigate(['tabs/todo-list/edit']);
  }

  deleteItem(todoItem: TodoItem): void {
    this.appService.presentLoadingModalDelete();
    this.subs.sink = this.todoListService.deleteTodoItem(todoItem).subscribe(() => {
      this.appService.dismissLoadingModal();
      this.appService.presentToast({
        color: 'success', message: 'Todo item deleted successfully!', duration: 1000
      });
    }, (err) => {
      this.appService.dismissLoadingModal();
      this.appService.presentToast({
        color: 'danger', message: 'Error deleting todo item!', duration: 1000
      });
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
