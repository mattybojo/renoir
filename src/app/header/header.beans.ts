type SlotType = 'start' | 'end';

export interface HeaderAction {
  type: string;
  slot: SlotType;
  icon: string;
}
