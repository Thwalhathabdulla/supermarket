import { Component } from '@angular/core';
import { ProductService} from '../service/product/product.service';
import { Storage } from "@ionic/storage";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  items         : any = [];
  searchQuery   : any;
  cart          : any = [];
  searchresult  : boolean = true;
  lan           : any;
  constructor(
    private storage : Storage,
    private service : ProductService
  ) {}

  async ngOnInit() {
    this.storage.get('lang').then(res=>{
      this.lan = res
    });
  }
  ionViewWillEnter(){
    this.ngOnInit()
    this.items=[];
    this.searchQuery="";
  }
  async search(event) {
    await this.storage.get("cart").then(val => {
      this.cart = val;
    });

    const Subsearch = {
      searchkey: event.target.value,
      lang : this.lan
    };

    this.service.searchitems(Subsearch).subscribe(res=>{
      if (res.length != 0) {
        this.searchresult = false;
        if (this.cart) {
          for (let i = 0; i < res.length; i++) {
            for (let p of this.cart) {
              if (p.PID === res[i]["PID"]) {
                res[i]["quantity"] = p.quantity;
                res[i]["hidefield"] = false;
              }
            }
          }
        }
      this.items = res;
      } else {
        this.searchresult = true;
      }
    })
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
