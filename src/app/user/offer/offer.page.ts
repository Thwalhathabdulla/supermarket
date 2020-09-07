import { Component, OnInit } from '@angular/core';
import { ProductService} from '../../service/product/product.service';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-offer',
  templateUrl: './offer.page.html',
  styleUrls: ['./offer.page.scss'],
})
export class OfferPage implements OnInit {
  islanguageEn : Boolean = false;
  products : any;
  constructor(
    private service: ProductService,
    private storage : Storage
  ) { }

  async ngOnInit() {
    await this.storage.get('lang').then(res=>{
      this.islanguageEn = res;
    });
    const obj ={
      lang : this.islanguageEn
    }
    this.service.getoffer(obj).subscribe(res => {
      this.products = res;
    });
  }
  ionViewWillEnter() {
    this.ngOnInit();
  }
  back(){
      window.history.back();
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
