import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'usermodal',
    loadChildren: () => import('./user/usermodal/usermodal.module').then( m => m.UsermodalPageModule)
  },
  {
    path: 'confirm',
    loadChildren: () => import('./order/confirm/confirm.module').then( m => m.ConfirmPageModule)
  },
  {
    path: 'success',
    loadChildren: () => import('./order/success/success.module').then( m => m.SuccessPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
