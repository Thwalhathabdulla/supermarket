import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { CartService} from '../../service/cart/cart.service';
@Component({
  selector: 'app-myorder',
  templateUrl: './myorder.page.html',
  styleUrls: ['./myorder.page.scss'],
})
export class MyorderPage implements OnInit {
  orderValue = "pending";
  uid:any;
  pendingOrder:any;
  constructor(
    private storage: Storage,
    public route:Router,
    private service:CartService
  ) { }

  async ngOnInit() {
    await this.storage.get('UID').then(val=>{
      this.uid=val;
    });
    if(!this.uid){
      this.route.navigate(['/login']);
    }
    const userID = {
      uid:this.uid
    } 
    this.service.pending(userID).subscribe(res =>{
      this.pendingOrder=res;
      // console.log(res)

    });

  }

  async viewOrder(oid,addrs,status)
  {
    await this.storage.set('oid',oid);
    if(status=="Processing" || status == "Assign")
    {
      this.route.navigate(['/tabs/vieworder']);
    }
    else{
      await this.storage.set('address',addrs[0])
      this.route.navigate(['/tabs/orderdetails']);
    }
    
  }

  segmentChanged(ev: any) {
    const userID = {
      uid:this.uid
    }
    // console.log(ev.detail.value)
    if(ev.detail.value=="pending")
    {
      // console.log("enter12")
    this.service.pending(userID).subscribe(res =>{
      this.pendingOrder=res;
    });
    }
    else{
      // console.log("enter1")
      this.service.delevered(userID).subscribe(res => {
        this.pendingOrder=res;
      });
    }
  }

}
