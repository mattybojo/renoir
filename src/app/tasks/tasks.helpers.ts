import { Category, Task } from './tasks.beans';

export const dateCategories: Category[] = [
  {
    category: 'pastDue',
    label: 'Past Due',
    sharedWith: [],
    sortOrder: 1,
    type: 'date'
  },
  {
    category: 'today',
    label: 'Today',
    sharedWith: [],
    sortOrder: 2,
    type: 'date'
  },
  {
    category: 'week',
    label: 'This Week',
    sharedWith: [],
    sortOrder: 3,
    type: 'date'
  },
  {
    category: 'month',
    label: 'This Month',
    sharedWith: [],
    sortOrder: 4,
    type: 'date'
  },
  {
    category: 'future',
    label: 'Future',
    sharedWith: [],
    sortOrder: 5,
    type: 'date'
  },
  {
    category: 'noDate',
    label: 'No Date',
    sharedWith: [],
    sortOrder: 6,
    type: 'date'
  },
];

export const createTask = (): Task => {
  return {
    category: '',
    label: '',
    dueDate: 0,
    lastCompletedDate: 0,
    notes: '',
    sharedWith: [],
    sortOrder: -1,
    uid: ''
  };
}
