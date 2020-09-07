import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavouratePageRoutingModule } from './favourate-routing.module';

import { FavouratePage } from './favourate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavouratePageRoutingModule
  ],
  declarations: [FavouratePage]
})
export class FavouratePageModule {}
