import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IonicModule } from '@ionic/angular';
import { HeaderModule } from './../header/header.module';
import { WeatherComponent } from './weather.component';

@NgModule({
  declarations: [WeatherComponent],
  imports: [
    IonicModule,
    CommonModule,
    HeaderModule,
    FontAwesomeModule
  ]
})
export class WeatherModule { }
