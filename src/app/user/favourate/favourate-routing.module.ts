import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FavouratePage } from './favourate.page';

const routes: Routes = [
  {
    path: '',
    component: FavouratePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavouratePageRoutingModule {}
