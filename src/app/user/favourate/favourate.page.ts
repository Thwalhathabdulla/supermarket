import { Component, OnInit } from '@angular/core';
import { Storage } from "@ionic/storage";
import { ProductService} from '../../service/product/product.service';
@Component({
  selector: 'app-favourate',
  templateUrl: './favourate.page.html',
  styleUrls: ['./favourate.page.scss'],
})
export class FavouratePage implements OnInit {
  cart = [];
  favourate = [];
  constructor(
    private storage : Storage,
    private service : ProductService
  ) { }

  async ngOnInit() {
    await this.storage.get("cart").then(val => {
      this.cart = val;
    });
    await this.storage.get("favourates").then(val =>{
      if(val)
      {
        for(let i = 0 ;i<val.length;i++ ){
          for (let p of this.cart){
            if (p.PID === val[i]["PID"])
            {
              val[i]["quantity"] = p.quantity;
              val[i]["hidefield"] = false;
            }
          }
        }
      }
      
      // console.log(val)
      this.favourate=val
    });

  }
  ionViewWillEnter() {
    this.ngOnInit();
  }

  remove(pid,index){
    this.favourate.splice(index, 1);
    this.service.addfav(pid);

  }
  addcart(event: any, item) {
    this.service.addProducttocart(item);
    item.hidefield = false;
    this.ionViewWillEnter();
  }
  //decrease product
  async decreaseProduct(item){
    await this.service.decreaseProduct(item).then(data => {
     if(data){
       item.hidefield = true;
      }
     this.ngOnInit();
     // item.quantity--
    })
   }
   back(){
     window.history.back()
   }
}
