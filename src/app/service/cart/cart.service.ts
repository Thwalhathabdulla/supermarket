import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  url = environment.url;

  constructor(
    private http            : HttpClient,
    private alertController : AlertController
  ) { }

  //select user
  getaddress(uid): Observable<any>{
    return this.http.post<any>(this.url+"/api/getaddrs",uid).pipe(
      catchError(e => {
        this.showAlert(e.error.msg);
        throw new Error(e);
      })
    );
  }

  //alert controller
  showAlert(msg) {
    let alert = this.alertController.create({
      message: msg,
      header: "Error",
      buttons: ["OK"]
    });
    alert.then(alert => alert.present());
  }

  //add new address
  addAddress(addrs): Observable<any> {
    return this.http.post<any>(this.url + "/api/addaddres",addrs).pipe(
      // tap(res => {
      //   console.log(res)
      // }),
      catchError(e => {
        this.showAlert(e.error.msg);
        throw new Error(e);
      })
    );
  }
  getshopdeails(){
    return this.http.get<any>(this.url + "/api/shopedetails").pipe(
      catchError(e => {
        this.showAlert(e.error.msg);
        throw new Error(e);
      })
    );
  }
  //checkout order
  checkout(obj){
    return this.http.post(this.url+'/api/checkout',obj).pipe(
      catchError(e=>{
        this.showAlert(e.error.msg);
        throw new Error(e);
        
      })
    );
  }


    //get order details
    getorder(OrderID){
      return this.http.post(this.url+'/api/getorder',OrderID).pipe(
        catchError(e=>{
          this.showAlert(e.error.msg);
          throw new Error(e);
          
        })
      );
    }
    
    //cancel order
  cancelorder(OID){
    return this.http.post(this.url+'/api/cancelOrder',OID).pipe(
      catchError(e=>{
        this.showAlert(e.error.msg);
        throw new Error(e);
        
      })
    );
  }
  //delete address
  deleteaddress(id){
    return this.http.post(this.url+'/api/deleteaddress',id).pipe(
      catchError(e=>{
        this.showAlert(e.error.msg);
        throw new Error(e);
        
      })
    );
  }

  //update address
  updateaddr(obj)
  {
    return this.http.post(this.url+'/api/updateaddress',obj).pipe(
      catchError(e=>{
        this.showAlert(e.error.msg);
        throw new Error(e);
        
      })
    );
  }
    //get the pending order
    pending(uid){
      return this.http.post(this.url+'/api/pendingOrder',uid).pipe(
        catchError(e=>{
          this.showAlert(e.error.msg);
          throw new Error(e);
          
        })
      );
    }

    //get the delevered order or cancel order
  delevered(uid)
  {
    return this.http.post(this.url+'/api/delevered',uid).pipe(
      catchError(e=>{
        this.showAlert(e.error.msg);
        throw new Error(e);
        
      })
    );
  }
  
}
