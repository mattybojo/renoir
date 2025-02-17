import { FirebaseOptions } from 'firebase/app';
import { IconDefinition } from '@fortawesome/angular-fontawesome';

export interface Environment {
  production: boolean;
  firebase: FirebaseOptions;
  bypassAuthGuard: boolean;
}

export interface UserDataPermission {
  sharedWith: string[];
}

export interface SortOption {
  sortProp: string;
  sortOrder: SortOrderOption;
}

export interface MenuItem {
  title: string;
  url: string;
  icon: IconDefinition;
}

export type SortOrderOption = 'asc' | 'desc';
