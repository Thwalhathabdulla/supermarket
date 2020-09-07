import { Component, OnInit } from '@angular/core';
import { Storage } from "@ionic/storage";
import { AlertController } from "@ionic/angular";
import { Router } from '@angular/router';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { fas, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { CartService}  from '../../service/cart/cart.service';
@Component({
  selector: 'app-vieworder',
  templateUrl: './vieworder.page.html',
  styleUrls: ['./vieworder.page.scss'],
})
export class VieworderPage implements OnInit {
  bag=faShoppingBag;
  orderID:any;
  orderdate:any;
  AssignDate:any;
  Delivered:any
  constructor(
    private storage:Storage,
    private alertController: AlertController,
    private router: Router,
    private callNumber: CallNumber,
    private service : CartService
  ) { }

  async ngOnInit() {
    await this.storage.get("oid").then(val=>{
      this.orderID=val;
    });
    const obj ={
      OID:this.orderID
    }
    await this.service.getorder(obj).subscribe(val => {
      // console.log(val);
      this.orderdate=val[0].OrderDate;
      this.AssignDate=val[0].AssignDate;
      this.Delivered=val[0].DeliverDate;
      // console.log(this.orderdate)
    })
  }
  callfor(){
    this.callNumber.callNumber("092440321", true)
  .then(res => console.log('Launched dialer!', res))
  .catch(err => alert('Error launching dialer'));
  }
//cancel order
async cancelorder(){
  const alert = await this.alertController.create({
    header: "Confirm!",
    message: "Do You Want To cancel this order!!!",
    buttons: [
      {
        text: "Cancel",
        role: "cancel",
        cssClass: "secondary",
        handler: blah => {
          // console.log("Confirm Cancel: blah");
        }
      },
      {
        text: "Ok",
        handler: () => {
          const obj ={
            OID:this.orderID
          }
          this.service.cancelorder(obj).subscribe(res=>{
            this.storage.set('oid',"");
            this.router.navigate(['/']);
          });
        }
      }
    ]
  });

  await alert.present();
}

back(){
  window.history.back()
}
}
