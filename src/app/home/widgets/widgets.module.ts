import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BillSplitterComponent } from './bill-splitter/bill-splitter.component';
import { CurrencyConverterComponent } from './currency-converter/currency-converter.component';
import { JokeComponent } from './joke/joke.component';

@NgModule({
  declarations: [JokeComponent, CurrencyConverterComponent, BillSplitterComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [JokeComponent, CurrencyConverterComponent, BillSplitterComponent]
})
export class WidgetsModule { }
