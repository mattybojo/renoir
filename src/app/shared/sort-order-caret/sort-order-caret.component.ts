import { Component, Input } from '@angular/core';

@Component({
  selector: 'ren-sort-order-caret',
  templateUrl: './sort-order-caret.component.html',
  styleUrls: ['./sort-order-caret.component.scss'],
})
export class SortOrderCaretComponent {
  @Input() param: string;
  @Input() sortOrder: string;
  @Input() sortParam: string;
}
