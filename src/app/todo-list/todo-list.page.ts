import { EditTodoItemComponent } from './edit-todo-item/edit-todo-item.component';
import { TodoItem } from './todo-list.beans';
import { TodoListService } from './todo-list.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderAction } from '../header/header.beans';
import { SubSink } from 'subsink';
import { AppService } from '../app.service';
import { ComponentProps, ComponentRef } from '../app.beans';
import { IonItemSliding, ModalOptions, ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'ren-todo-list',
  templateUrl: './todo-list.page.html',
  styleUrls: ['./todo-list.page.scss'],
})
export class TodoListPage implements OnDestroy, ViewWillEnter {

  headerActions: HeaderAction[];
  todoItems: TodoItem[];

  private subs = new SubSink();

  constructor(private todoListService: TodoListService, private appService: AppService) {
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

  onClickItem(todoItem: TodoItem): void {
    this.presentModal(EditTodoItemComponent, { todoItem });
  }

  async presentModal(compRef: ComponentRef, todoItemProps: ComponentProps<ComponentRef>): Promise<void> {
    const modalOpts: ModalOptions = {
      component: compRef,
      componentProps: todoItemProps,
      presentingElement: await this.appService.getModalPresentingElement(),
      canDismiss: true
    };

    this.appService.presentModal(modalOpts);
  }

  actionHandler(actionType: string): void {
    switch (actionType) {
      case 'add':
        this.presentModal(EditTodoItemComponent, {});
        break;
      default:
        console.error(`Unknown action type: ${actionType}`);
    }
  }

  updateItem(todoItem: TodoItem, slidingItem: IonItemSliding): void {
    this.presentModal(EditTodoItemComponent, { todoItem });
    slidingItem.close();
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
