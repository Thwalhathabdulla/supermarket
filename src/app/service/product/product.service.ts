import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { AlertController } from '@ionic/angular';
import { Observable ,BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Storage } from "@ionic/storage";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url = environment.url;
  fav = [];
  cart:any = []

  public cartItemCount  = new BehaviorSubject(0);


  constructor(
    private http: HttpClient,
    private alertController: AlertController,
    private storage: Storage,
  ) { }

  getcategory(obj): Observable<any> {
    return this.http.post<any>(this.url + "/api/usrcategory",obj).pipe(
      catchError(e => {
        this.showAlert(e.error.msg);
        throw new Error(e);
      })
    );
  }

  getProdectsPage(obj):Observable<any>{
    return this.http.post<any>(this.url + "/api/prdpage",obj).pipe( 
      catchError(e => {
        this.showAlert(e.error.msg);
        throw new Error(e);
      })
    );
  }
  ///alert messaage
  //get the error alert controller 
  showAlert(msg) {
    let alert = this.alertController.create({
      message: msg,
      header: "Error",
      buttons: ["OK"]
    });
    alert.then(alert => alert.present());
  }


  getsubcategoryproduct(SID): Observable<any> {
    return this.http
      .post<any>(this.url + "/api/subcategoryproduct", SID)
      .pipe(
        catchError(e => {
          this.showAlert(e.error.msg);
          throw new Error(e);
        })
      );
  }

  async addProducttocart(item) {
    if(!this.cart){
      this.cart = [item];
    }else{
      let added = false;
    if (this.cart) {
      for (let p of this.cart) {
        if (p.PID === item.PID) {
          p.quantity += 1;
          added = true;
          this.cartItemCount.next(this.cartItemCount.value + 1);
          break;
        }
      }
    }
    if (!added) {
      this.cart.push(item);
    }
    }

    this.storagesave();//save into the cart temp file
  }


  //decrease product
  async decreaseProduct(item) {
    for (let [index, p] of this.cart.entries()) {
      if (p.PID === item.PID) {
        if (p.quantity == 1) {
          this.cart.splice(index, 1);
          this.storagesave()
          return true;
        }else{
          p.quantity -= 1;
          this.storagesave()
          return false;
        }
      }
    }
  }



  //search items
  //search product items
  searchitems(searchkey): Observable<any> {
    return this.http
      .post<any>(this.url + "/api/searchitems", searchkey)
      .pipe();
  }


  async storagesave() {
     this.storage.set("cart", this.cart);
     this.storage.set("cartItemcount",this.cartItemCount);
    //  this.loaddata()
  }
  async loaddata(){
    await this.storage.get("cart").then(val=>{
      this.cart = val
    });
    return this.cart;
  }
  async loadcount(){
    await this.storage.get("cart").then(val=>{
      this.cartItemCount.next(val.length)
    });
  }

  //claer cart data
  async clearcart() {
    this.cart = [];
    this.cartItemCount.next(0)
    await this.storagesave();
  }
  async removeProduct(product) {
    for (let [index, p] of this.cart.entries()) {
      if (p.PID === product.PID) {
        this.cartItemCount.next(this.cartItemCount.value - p.amount);
        this.cart.splice(index, 1);
      }
    }
    // this.cartcount = 0;
    await this.storagesave();
  }


  //ADD TO FAVOURATES 
  addfav(item){
    let added = false;
    if(this.fav)
    {
    for (let f of this.fav) {
      if (f.PID === item.PID) {
        added = true;
        break;
      }
    }
  }
    if (!added) {
      this.fav.push(item);
      item.icon="heart"
    }
    else{
      for (let [index, p] of this.fav.entries()) {
        if (p.PID === item.PID) {
          item.icon="heart-outline"
          this.fav.splice(index, 1);
        }
      }
    }
    this.storage.set("favourates",this.fav);
    // console.log(this.fav)
  }
  //get the offer product
  getoffer(obj):Observable<any>{
    return this.http
      .post<any>(this.url + "/api/getoffer",obj)
      .pipe(
        catchError(e => {
          this.showAlert(e.error.msg);
          throw new Error(e);
        })
      );
  }
}
