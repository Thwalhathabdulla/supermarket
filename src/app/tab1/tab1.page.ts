import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product/product.service';
import { Storage} from '@ionic/storage';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  categorys:any;
  slidershow:Boolean = true;
  skelitonItems :any = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
  islanguageEn : Boolean = false;
  first:Boolean = false;
  ios :Boolean = false;
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    speed: 1000,
    autoplay:true
   };

  constructor(
      private service:ProductService,
      private storage:Storage,
      public platform: Platform
  ) {}

  async ngOnInit() {
    this.skelitonItems  = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
    await this.storage.get('lang').then(res=>{
      this.islanguageEn = res;
    });
    this.getcategory();
    this.ios = this.platform.is("ios" || "iphone");
  }

  language(event){
    this.islanguageEn = event.detail.checked;
      this.storage.set('lang',this.islanguageEn);
      this.getcategory();
  }
  getcategory(){
    const obj ={
      en : this.islanguageEn
    }
    this.service.getcategory(obj).subscribe(res=>{
      this.categorys=res;
      this.skelitonItems = [];
    })
  }
}
