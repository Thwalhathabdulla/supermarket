import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product/product.service';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  id            : any;
  lang          : any;
  subcategorys  : any;
  allcategory   : any = 0;
  products      : any;
  cart          : any;
  skelitonItems :any = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
  constructor(
    public service:ProductService,
    private activatedRoute: ActivatedRoute,
    public storage:Storage
  ) { }

  async ngOnInit() {
    await this.storage.get('lang').then(res=>{
      this.lang = res;//get the language 
    });
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
  }
  async ionViewWillEnter(){
    await this.storage.get('lang').then(res=>{
      this.lang = res;//get the language 
    });
    await this.storage.get("cart").then(val => {
      this.cart = val;
    });
    const myObj = {
      CID   : this.id,
      lang  : this.lang
    };
    //get the details
    this.service.getProdectsPage(myObj).subscribe(res=>{
      this.skelitonItems = []
      this.subcategorys =res.subcategory;
      this.products     = res.products;
      //change cart added quantity
      if (this.cart) {
        for (let i = 0; i < this.products.length; i++) {
          const element = this.products[i];
          for (let p of this.cart) {
            if (p.PID == element.PID) {
              this.products[i].hidefield = false;
              this.products[i].quantity = p.quantity;
            }
          }
        }
      }
    })
  }


  //on change subcategory product
  onSegmentChange(SID) {
    const prds = {
      CID: this.id,
      SID: SID
    };
    this.service.getsubcategoryproduct(prds).subscribe(res => {
      this.products = res;
    });
  }


  //add the cartt
  async addcart(event: any, item) {
    await this.service.addProducttocart(item);
    item.hidefield = false;
    // item.quantity++
    this.ngOnInit();
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

}
