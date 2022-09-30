import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { PickerOptions, ViewWillEnter } from '@ionic/angular';
import { SubSink } from 'subsink';
import { AppService } from '../app.service';
import { HeaderAction } from '../header/header.beans';
import { DataService } from '../shared/data.service';
import { FilterSetting, SortSetting } from './../shared/filter-sort/filter-sort.beans';
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
  filteredTodoItems: TodoItem[];

  sortSettings: SortSetting;
  pickerOptions: PickerOptions;
  filterSettings: FilterSetting[];

  private subs = new SubSink();

  constructor(private todoListService: TodoListService, private appService: AppService,
    private dataService: DataService, private router: Router) {
    this.headerActions = [{
      type: 'add',
      slot: 'start',
      icon: 'add'
    }];

    this.sortSettings = {
      sortProperty: 'dueDate',
      sortPropertyLabel: 'Due Date',
      sortOrder: 'ASC'
    };

    this.pickerOptions = {
      columns: [{
        name: 'Property',
        options: [{
          text: 'Title',
          value: 'title'
        }, {
          text: 'Date Created',
          value: 'dateCreated'
        }, {
          text: 'Date Modified',
          value: 'dateModified'
        }, {
          text: 'Due Date',
          value: 'dueDate'
        }, {
          text: 'Assigned To',
          value: 'assignedTo'
        }, {
          text: 'Priority',
          value: 'priority'
        }]
      }]
    };

    this.filterSettings = [{
      label: 'Title',
      property: 'title',
      type: 'text',
    }, {
      label: 'Todo Notes',
      property: 'body',
      type: 'text'
    }, {
      label: 'Date Created',
      property: 'dateCreated',
      type: 'date'
    }, {
      label: 'Date Modified',
      property: 'dateModified',
      type: 'date'
    }, {
      label: 'Due Date',
      property: 'dueDate',
      type: 'date'
    }, {
      label: 'Assigned To',
      property: 'assignedTo',
      type: 'text'
    }, {
      label: 'Priority',
      property: 'priority',
      type: 'text'
    }];
  }

  ionViewWillEnter(): void {
    this.loadTodoListItems();
  }

  loadTodoListItems(): void {
    this.subs.sink = this.todoListService.getTodoItems().subscribe((todoItems: TodoItem[]) => {
      this.todoItems = this.filteredTodoItems = todoItems;
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
