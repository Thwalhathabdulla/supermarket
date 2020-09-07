import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VieworderPageRoutingModule } from './vieworder-routing.module';

import { VieworderPage } from './vieworder.page';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FontAwesomeModule,
    VieworderPageRoutingModule
  ],
  declarations: [VieworderPage]
})
export class VieworderPageModule {}
