export type SortDirection = 'ASC' | 'DESC';

// Currently implemented: date, text
// Partially implemented: checkbox
export type FilterType = 'checkbox' | 'date' | 'datetime' | 'text' | 'number' | 'radio' | 'select' | 'segment' | 'toggle';

export interface FilterOption {
  label: string;
  value?: string; // Optional for checkbox
}

export interface FilterSortSettings {
  sort?: SortSetting;
  filter?: FilterSetting[];
}

export interface SortSetting {
  sortProperty?: string;
  sortPropertyLabel?: string;
  sortOrder?: SortDirection;
}

export interface FilterSetting {
  label: string;
  property: string;
  type: FilterType;
  initialValue?: any;
  value?: any; // the value from the filter
  options?: FilterOption[]; // required for checkbox
  operand?: string; // =, >, <, includes, contains, etc.  Not required for checkbox
}
