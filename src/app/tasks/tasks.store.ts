import { computed, inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { setAllEntities, withEntities } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { add, isBefore, isSameDay, set } from 'date-fns';
import { filter, sortBy } from 'lodash-es';
import { exhaustMap, pipe, tap, zip } from 'rxjs';
import { SortOption } from '../app.beans';
import { AppService } from '../app.service';
import { setCompleted, setError, withLoadingState } from '../shared/state/loading.feature';
import { Category, Task } from './tasks.beans';
import { TasksService } from './tasks.service';

type TasksState = {
  categories: Category[];
  sortOption: SortOption;
}

const initialState: TasksState = {
  categories: [],
  sortOption: {
    sortProp: 'category',
    order: 'desc'
  }
};

export const TasksStore = signalStore(
  { providedIn: 'root' },
  withLoadingState(),
  withState(initialState),
  withEntities<Task>(),
  withComputed(({ categories, sortOption, entities }) => ({
    sortedCategoryItems: computed(() => {
      let sortedCategories: Category[] = [];
      let foundIndex: number;
      if (categories().length > 0) {
        if (sortOption.sortProp() === 'category') {
          sortedCategories = sortBy(filter(categories(), ['type', 'category']), 'sortOrder');
          sortedCategories.push({
            category: 'unassigned',
            label: 'Unassigned',
            sharedWith: [],
            sortOrder: categories().length + 1,
            type: 'category'
          });

          sortedCategories.forEach((category: Category) => category.items = []);

          // Sort items into categories
          entities().forEach((item: Task) => {
            foundIndex = sortedCategories.findIndex((category: Category) => category.category === item.category);
            if (foundIndex === -1) {
              // Category not found, assign to unassigned
              item.category = 'unassigned';
              foundIndex = sortedCategories.findIndex((cat: Category) => cat.category === 'unassigned');
            }

            sortedCategories[foundIndex].items?.push(item);
          });
        } else {
          sortedCategories = sortBy(filter(categories(), ['type', 'date']), 'sortOrder');
          sortedCategories.forEach((category: Category) => category.items = []);

          // Break down into date categories
          // Calculate the date to check against for each option
          const today = set(new Date(), { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
          const nextWeek = add(today, { weeks: 1 });
          const nextMonth = add(today, { months: 1 });

          // Add items to the appropriate categories
          let categoryType: string;
          entities().forEach((item: Task) => {
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
            foundIndex = sortedCategories.findIndex((category: Category) => category.category === categoryType);
            sortedCategories[foundIndex].items?.push(item);
          });

          // Sort the date categories entries by due date
          sortedCategories.forEach((category: Category) => {
            if (category.items?.length === 0) {
              category.isExpanded = false;
            } else {
              category.isExpanded = true;
              category.items = sortBy(category.items, 'dueDate');
            }
          });
        }
      }
      return sortedCategories;
    })
  })),
  withMethods((store, tasksService = inject(TasksService), appService = inject(AppService)) => ({
    initDataLoad: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        exhaustMap(() => {
          return zip([tasksService.getAllTasks(), tasksService.getAllCategories()]).pipe(
            tapResponse({
              next: (data: [Task[], Category[]]) => {
                patchState(store, setCompleted(), setAllEntities(data[0]), { categories: data[1] });
              },
              error: (error: { message: string }) => {
                patchState(store, setError(error.message), setAllEntities(<Task[]>[]));
                appService.showErrorToast();
              },
            }),
          );
        }),
      ),
    ),
  }))
);
