import { HeaderModule } from './../header/header.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShortcutsPageRoutingModule } from './shortcuts-routing.module';

import { ShortcutsPage } from './shortcuts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShortcutsPageRoutingModule,
    HeaderModule
  ],
  declarations: [ShortcutsPage]
})
export class ShortcutsPageModule { }
