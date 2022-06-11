import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SortOrderCaretComponent } from './sort-order-caret/sort-order-caret.component';

@NgModule({
  declarations: [SortOrderCaretComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [SortOrderCaretComponent]
})
export class SharedModule { }
