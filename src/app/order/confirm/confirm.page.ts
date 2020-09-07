import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, AlertController } from '@ionic/angular';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { CartService } from '../../service/cart/cart.service';
import { Storage } from '@ionic/storage';
import {  ProductService} from '../../service/product/product.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.page.html',
  styleUrls: ['./confirm.page.scss'],
})
export class ConfirmPage implements OnInit {


  total   : number;
  orderID : any;
  address : any;
  user    : any;
  cart    : any;
  addrId  : any;
  myDate  : any = new Date();
  time    = moment().format('HHmmss');
  today   = new Date();
  closetime:any = new Date();
  method:any;

  constructor(
    private Modalcontroller : ModalController,
    private navParams       : NavParams,
    private alertController : AlertController,
    private router          : Router,
    private cartService     : CartService,
    private storage         : Storage,
    private ProductService  : ProductService
  ) { 
    this.total    = navParams.get('total');
    this.address  = navParams.get('address');
    this.cart     = navParams.get('cart');
    this.addrId   = this.address['AddrId'];
  }

  ngOnInit() {
    this.cartService.getshopdeails().subscribe(res=>{
      this.closetime = res['closingtime'];
    })
  }

   //close modal
   async closeModal()
   { 
     await this.Modalcontroller.dismiss()
   }
  async conformOrder(){
    if(this.time > this.closetime){
      this.showmessage();
      return false
    }else{
      await this.storage.get("UID").then(val=>{
        this.user=val
        // console.log(this.user)
      });
      const checkoutObj={
        addrID:this.addrId,
        date:this.myDate,
        uid:this.user,
        items:this.cart,
        Total:this.total
      }
      await this.cartService.checkout(checkoutObj).subscribe(async res=>{
        this.orderID=res['OID'];
        await this.storage.set('oid',this.orderID);
        await this.showAlert(res['msg']);
        this.ProductService.clearcart();

      });
    }
  }

  showmessage(){
    let alert = this.alertController.create({
      message: "Please Order Between 8AM To 11PM",
      header: "Warning",
      buttons: [
        {
          text: "Ok",
          handler: async () => {
            await this.Modalcontroller.dismiss();
            this.router.navigate(['/tabs']);
          }
        }
      ]
    });
    alert.then(alert => alert.present());
  }

  //alert controller
  showAlert(msg) {
    let alert = this.alertController.create({
      message: msg,
      header: "Success",
      buttons: [
        {
          text: "Ok",
          handler: async () => {
            await this.Modalcontroller.dismiss();
            this.router.navigate(['/success']);
          }
        }
      ]
    });
    alert.then(alert => alert.present());
  }
}
