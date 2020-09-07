import { Component, OnInit } from '@angular/core';
import { Storage } from "@ionic/storage";
import {CartService} from '../../service/cart/cart.service';
@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.page.html',
  styleUrls: ['./orderdetails.page.scss'],
})
export class OrderdetailsPage implements OnInit {
  orderID:any;
  OrderStatus:any;
  amount:any;
  name:any;
  addr1:any;
  addr2:any;
  orderDate:any;
  items:any;
  constructor(
    private storage:Storage,
    private service:CartService
  ) { }

 async ngOnInit() {
    await this.storage.get("address").then(val =>{
      // console.log(val)
      this.name=val.name;
      this.addr1=val.Buildinf;
      this.addr2=val.Street;
      // console.log(this.name)
      // console.log(val)
    });
  }
  async ionViewWillEnter(){
    await this.storage.get("oid").then(val=>{
      this.orderID=val;
    });
    const OID={
      OID:this.orderID
    }
     await this.service.getorder(OID).subscribe(res=>{
      //  console.log(res);
      this.OrderStatus=res[0].OrderStatus;
      this.amount=res[0].Total;
      this.orderDate=res[0].OrderDate;
      this.items=res[0].Items;
      // console.log('Status::::::::::::::::::::', this.OrderStatus);
      
    });
  }

  getTotal(item){
    return item.Price*item.Quantity
  }
  back(){
    window.history.back();
  }
}
