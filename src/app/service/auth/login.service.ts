import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { tap, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url         = environment.url;
  user        = null;
  backurl : any;

  constructor(
    private http: HttpClient,
    private alertController: AlertController,
    private router:Router,
    private storage: Storage,
  ) { }

  login(credentials){
    return this.http.post(this.url + "/api/login",credentials).pipe(
      tap(res => {

        // console.log(res['UserID'])
        this.storage.set('UID', res['UserID']);
        if (this.backurl) {
          this.router.navigate(['/tabs/cart'])
        }else{
          this.router.navigate(['/'])
        }
      }),
      catchError(e => {
        this.showAlert(e.error.msg);
        throw new Error(e);
      })
    );
  }


  //alert controler
  showAlert(msg) {
    let alert = this.alertController.create({
      message: "invalid Cridential",
      header: 'Error',
      buttons: ['OK']
    });
    alert.then(alert => alert.present());
  }

  //get the user details
  getUserDeatils(User){
    return this.http.post(`${this.url}/api/getuser`, User)
    .pipe(
      // tap(res => {
      //   // console.log(res['UserID'])
      // }),
      catchError(e => {
        this.showAlert(e.error.msg);
        throw new Error(e);
      })
    );
  }
//update user details
updateUser(User){
  return this.http.post(`${this.url}/api/updateUser`, User)
  .pipe(
    // tap(res => {
    //   // console.log(res['UserID'])
    // }),
    catchError(e => {
      this.showAlert(e.error.msg);
      throw new Error(e);
    })
  );
}
}
