import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'search',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'cart',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      },
      {
        path: 'product/:id',
        loadChildren: () => import('../product/product.module').then( m => m.ProductPageModule)
      },
      {
        path: 'vieworder',
        loadChildren: () => import('../order/vieworder/vieworder.module').then( m => m.VieworderPageModule)
      },
      {
        path: 'address',
        loadChildren: () => import('../user/address/address.module').then( m => m.AddressPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../user/profile/profile.module').then( m => m.ProfilePageModule)
      },
      {
        path: 'myorder',
        loadChildren: () => import('../user/myorder/myorder.module').then( m => m.MyorderPageModule)
      },
      {
        path: 'favourate',
        loadChildren: () => import('../user/favourate/favourate.module').then( m => m.FavouratePageModule)
      },
      {
        path: 'offer',
        loadChildren: () => import('../user/offer/offer.module').then( m => m.OfferPageModule)
      },
      {
        path: 'message',
        loadChildren: () => import('../user/message/message.module').then( m => m.MessagePageModule)
      },
      {
        path: 'orderdetails',
        loadChildren: () => import('../order/orderdetails/orderdetails.module').then( m => m.OrderdetailsPageModule)
      }
    ] 
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
