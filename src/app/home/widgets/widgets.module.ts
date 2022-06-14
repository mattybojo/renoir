import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JokeComponent } from './joke/joke.component';

@NgModule({
  declarations: [JokeComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [JokeComponent]
})
export class WidgetsModule { }
