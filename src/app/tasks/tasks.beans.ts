import { SortOption, UserDataPermission } from '../app.beans';

export interface Task extends UserDataPermission {
  category: string;
  label: string;
  lastCompletedDate: number;
  dueDate: number;
  sortOrder: number;
  notes: string;
  uid?: string;
  id?: string;
}

export interface Category extends UserDataPermission {
  id?: string;
  label: string;
  category: string;
  sortOrder: number;
  type: CategoryType;
  items?: Task[];
  isExpanded?: boolean;
}

export type CategoryType = 'category' | 'date';

export interface TaskSortOption extends SortOption {
  sortProp: CategoryType;
  sortOrder: 'asc' | 'desc';
}
