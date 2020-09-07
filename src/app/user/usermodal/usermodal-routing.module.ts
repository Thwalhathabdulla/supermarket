import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsermodalPage } from './usermodal.page';

const routes: Routes = [
  {
    path: '',
    component: UsermodalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsermodalPageRoutingModule {}
