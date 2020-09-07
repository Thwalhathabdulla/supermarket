import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsermodalPageRoutingModule } from './usermodal-routing.module';

import { UsermodalPage } from './usermodal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsermodalPageRoutingModule
  ],
  declarations: [UsermodalPage]
})
export class UsermodalPageModule {}
