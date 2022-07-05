import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CurrencyConverterComponent } from './currency-converter/currency-converter.component';
import { JokeComponent } from './joke/joke.component';

@NgModule({
  declarations: [JokeComponent, CurrencyConverterComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [JokeComponent, CurrencyConverterComponent]
})
export class WidgetsModule { }
