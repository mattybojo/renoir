import { CommonModule } from '@angular/common';
import { Component, effect, inject, OnDestroy, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStickyNote } from '@fortawesome/free-regular-svg-icons';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { AlertController, IonAccordion, IonAccordionGroup, IonCol, IonContent, IonFab, IonFabButton, IonFabList, IonGrid, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonRow, IonSegment, IonSegmentButton, ModalController } from '@ionic/angular/standalone';
import { AlertButton, SegmentChangeEventDetail } from '@ionic/core';
import { add, isBefore, isSameDay, set } from 'date-fns';
import { orderBy } from 'lodash-es';
import { combineLatest, take } from 'rxjs';
import { SubSink } from 'subsink';
import { SortOrderOption } from '../../app.beans';
import { AuthService } from '../../auth/auth.service';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { EditTaskNotePage } from '../edit-task-note/edit-task-note.page';
import { EditTaskPage } from '../edit-task/edit-task.page';
import { Category, CategoryType, Task, TaskSortOption } from '../tasks.beans';
import { createTask, dateCategories } from '../tasks.helpers';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.page.html',
  styleUrls: ['./task-list.page.scss'],
  standalone: true,
  imports: [IonItemOption, IonItemOptions, IonItemSliding, IonFabList, IonIcon, IonFabButton, IonFab, IonRow, IonGrid, IonCol, IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonContent, IonSegment, IonSegmentButton, CommonModule, FormsModule, FontAwesomeModule, HeaderComponent]
})
export class TaskListPage implements OnDestroy {

  @ViewChild('alert') alert!: HTMLIonAlertElement;

  isOpen: boolean = false;

  categories: Category[] = [];
  tasks: Task[] = [];
  sortOption = signal<TaskSortOption>({ sortProp: 'category', sortOrder: 'asc' });
  sortedTasks = signal<Category[]>([]);

  private subs = new SubSink();

  // DI
  private authService = inject(AuthService);
  private tasksService = inject(TasksService);
  private modalCtrl = inject(ModalController);
  private alertController = inject(AlertController);

  // Icons
  faStickyNote = faStickyNote;
  faPenToSquare = faPenToSquare;
  faTrash = faTrash;

  constructor() {
    effect(() => {
      if (this.authService.currentUser()) {
        this.subs.sink = combineLatest([this.tasksService.getCategories(), this.tasksService.getTasks()]).subscribe({
          next: (results) => {
            this.categories = results[0];
            this.tasks = results[1];
            this.sortCategoriesAndTasks(this.sortOption());
          },
          error: (err) => { console.error(err); }
        })
      }
    });

    effect(() => {
      this.sortCategoriesAndTasks(this.sortOption());
    });
  }

  sortCategoriesAndTasks(sortOption: TaskSortOption): void {
    let sortedTasks: Category[] = [];
    let foundIndex: number;
    if (this.categories.length > 0) {
      if (sortOption.sortProp === 'category') {
        let categories: Category[] = [...this.categories, {
          category: 'unassigned',
          label: 'Unassigned',
          sharedWith: [],
          sortOrder: this.categories.length + 1,
          type: 'category'
        }];
        sortedTasks = orderBy(categories, 'sortOrder', this.sortOption().sortOrder);

        sortedTasks.forEach((category: Category) => category.items = []);

        // Sort items into categories
        this.tasks.forEach((item: Task) => {
          foundIndex = sortedTasks.findIndex((category: Category) => category.category === item.category);
          if (foundIndex === -1) {
            // Category not found, assign to unassigned
            item.category = 'unassigned';
            foundIndex = sortedTasks.findIndex((cat: Category) => cat.category === 'unassigned');
          }

          sortedTasks[foundIndex].items?.push(item);
        });
      } else {
        sortedTasks = orderBy(dateCategories, 'sortOrder', this.sortOption().sortOrder);
        sortedTasks.forEach((category: Category) => category.items = []);

        // Break down into date categories
        // Calculate the date to check against for each option
        const today = set(new Date(), { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
        const nextWeek = add(today, { weeks: 1 });
        const nextMonth = add(today, { months: 1 });

        // Add items to the appropriate categories
        let categoryType: string;
        this.tasks.forEach((item: Task) => {
          if (item.dueDate === 0) {
            categoryType = 'noDate';
          } else if (isBefore(new Date(item.dueDate), today)) {
            categoryType = 'pastDue';
          } else if (isSameDay(new Date(item.dueDate), today)) {
            categoryType = 'today';
          } else if (isBefore(new Date(item.dueDate), nextWeek)) {
            categoryType = 'week';
          } else if (isBefore(new Date(item.dueDate), nextMonth)) {
            categoryType = 'month';
          } else {
            categoryType = 'future';
          }
          foundIndex = sortedTasks.findIndex((category: Category) => category.category === categoryType);
          sortedTasks[foundIndex].items?.push(item);
        });

        // Sort the date categories entries by due date
        sortedTasks.forEach((category: Category) => {
          if (category.items?.length === 0) {
            category.isExpanded = false;
          } else {
            category.isExpanded = true;
            category.items = orderBy(category.items, 'dueDate', this.sortOption().sortOrder);
          }
        });
      }
    }
    this.sortedTasks.set(sortedTasks);
  }

  async openTaskModal(clickedTask: Task): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: EditTaskPage,
      componentProps: { task: clickedTask, categories: orderBy(this.sortedTasks().filter(x => x.category !== 'unassigned'), 'label', 'asc') }
    });
    modal.present();
    await modal.onDidDismiss().then((result) => {
      if (result.data) {
        const foundIndex = this.tasks.findIndex((item: Task) => item.id && item.id === result.data.id);
        // foundIndex === -1 means this is a new item
        if (foundIndex === -1) {
          this.tasks.push(result.data);
        } else {
          this.tasks[foundIndex] = result.data;
        }
        this.sortCategoriesAndTasks(this.sortOption());
      }
    });
  }

  addTask(): void {
    this.openTaskModal(createTask());
  }

  async showConfirmDelete(task: Task): Promise<void> {
    const alertButtons: AlertButton[] = [
      {
        text: 'Cancel',
        role: 'cancel',
      },
      {
        text: 'OK',
        role: 'confirm',
        handler: () => {
          this.tasksService.deleteTask(task).pipe(take(1)).subscribe({
            next: () => {
              // Remove item from array
              let foundIndex: number;
              foundIndex = this.tasks.findIndex(x => x.id === task.id);
              if (foundIndex > -1) {
                this.tasks.splice(foundIndex, 1);
              }
              const tasksToUpdate: Task[] = [];
              // Adjust any sort orders of tasks that are after the one to be deleted
              this.tasks.filter(x => x.category === task.category && x.sortOrder > task.sortOrder).forEach((item: Task) => {
                foundIndex = this.tasks.findIndex(x => x.id === item.id);
                this.tasks[foundIndex].sortOrder -= 1;
                tasksToUpdate.push(this.tasks[foundIndex]);
              });
              if (tasksToUpdate.length > 0) {
                this.tasksService.updateTasks(tasksToUpdate);
              }
              this.sortCategoriesAndTasks(this.sortOption());
            }
          });
        },
      },
    ];

    const alert = await this.alertController.create({
      header: 'Confirm deletion',
      message: 'Task will be deleted.',
      buttons: alertButtons,
    });

    await alert.present();
  }

  updateSortOption(e: CustomEvent<SegmentChangeEventDetail>, type: string): void {
    if (type === 'sortProp') {
      this.sortOption.set({ ...this.sortOption(), sortProp: e.detail.value as CategoryType })
    } else if (type === 'sortOrder') {
      this.sortOption.set({ ...this.sortOption(), sortOrder: e.detail.value as SortOrderOption })
    }
  }

  async showNote(e: Event, clickedTask: Task): Promise<void> {
    e.stopPropagation();
    const modal = await this.modalCtrl.create({
      component: EditTaskNotePage,
      componentProps: { task: clickedTask }
    });
    modal.present();
    await modal.onDidDismiss().then((result) => {
      if (result.data) {
        const foundIndex = this.tasks.findIndex((item: Task) => item.id === clickedTask.id);
        if (foundIndex !== -1) {
          this.tasks[foundIndex] = result.data;
        }
        this.sortCategoriesAndTasks(this.sortOption());
      }
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
