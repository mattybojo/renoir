import { CommonModule } from '@angular/common';
import { Component, effect, inject, OnDestroy, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonAccordion, IonAccordionGroup, IonCol, IonContent, IonGrid, IonItem, IonLabel, IonRow, IonSegment, IonSegmentButton, ModalController } from '@ionic/angular/standalone';
import { SegmentChangeEventDetail } from '@ionic/core';
import { add, isBefore, isSameDay, set } from 'date-fns';
import { orderBy } from 'lodash-es';
import { zip } from 'rxjs';
import { SubSink } from 'subsink';
import { SortOrderOption } from '../../app.beans';
import { AuthService } from '../../auth/auth.service';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { EditTaskPage } from '../edit-task/edit-task.page';
import { Category, CategoryType, Task, TaskSortOption } from '../tasks.beans';
import { dateCategories } from '../tasks.helpers';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.page.html',
  styleUrls: ['./task-list.page.scss'],
  standalone: true,
  imports: [IonRow, IonGrid, IonCol, IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonContent, IonSegment, IonSegmentButton, CommonModule, FormsModule, HeaderComponent]
})
export class TaskListPage implements OnDestroy {

  // DI
  private authService = inject(AuthService);
  private tasksService = inject(TasksService);
  private modalCtrl = inject(ModalController);

  categories: Category[] = [];
  tasks: Task[] = [];
  sortOption = signal<TaskSortOption>({ sortProp: 'category', sortOrder: 'asc' });
  sortedTasks = signal<Category[]>([]);

  private subs = new SubSink();

  constructor() {
    effect(() => {
      if (this.authService.currentUser()) {
        this.subs.sink = zip(this.tasksService.getCategories(), this.tasksService.getTasks()).subscribe({
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

  async viewTask(clickedTask: Task): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: EditTaskPage,
      componentProps: { task: clickedTask, categories: this.categories.filter(x => x.category !== 'unassigned') }
    });
    modal.present();
    await modal.onDidDismiss().then((result) => {
      if (result.data) {
        const foundIndex = this.tasks.findIndex((item: Task) => item.id === clickedTask.id);
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

  updateSortOption(e: CustomEvent<SegmentChangeEventDetail>, type: string): void {
    if (type === 'sortProp') {
      this.sortOption.set({ ...this.sortOption(), sortProp: e.detail.value as CategoryType })
    } else if (type === 'sortOrder') {
      this.sortOption.set({ ...this.sortOption(), sortOrder: e.detail.value as SortOrderOption })
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
