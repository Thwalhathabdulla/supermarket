import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Storage } from "@ionic/storage";
import { Router } from '@angular/router';
import { ModalController, IonRouterOutlet, Platform, AlertController } from '@ionic/angular';
import { ProductService} from '../service/product/product.service';
import { BehaviorSubject } from 'rxjs';
import { UsermodalPage} from '../user/usermodal/usermodal.page';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  ordercheck;
  cartItemCount: any;
  countvalue : BehaviorSubject<number>;
  count:any;
  constructor(
    private storage : Storage,
    private router  : Router,
    private service : ProductService,
    public modalController: ModalController,
    private routerOutlet: IonRouterOutlet,
  ) {}

  async ngOnInit() {
    await this.storage.get("UID").then(val=>{
      // console.log(val)
      if(!val)
      {
        this.router.navigate(['/login'])
      }
    });
    setInterval(async()=>{
      this.service.loadcount();
      this.countvalue = this.service.cartItemCount;
      this.count = this.countvalue.value;
    },100);
  }
  ionViewWillEnter(){
    this.service.loaddata();
  }

  async userProfile(){
    const modal = await this.modalController.create({
      component: UsermodalPage,
      swipeToClose: true,
    presentingElement: this.routerOutlet.nativeEl
    });
    return await modal.present();
  }

}
