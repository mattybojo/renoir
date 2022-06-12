import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SortOrderCaretComponent } from './sort-order-caret/sort-order-caret.component';
import { NoCommaPipe } from './no-comma.pipe';

@NgModule({
  declarations: [SortOrderCaretComponent, NoCommaPipe],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [SortOrderCaretComponent, NoCommaPipe]
})
export class SharedModule { }
