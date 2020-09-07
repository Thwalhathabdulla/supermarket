import { Component, ViewChild, ViewChildren, QueryList } from '@angular/core';

import { Platform,IonRouterOutlet,NavController, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { ProductService } from './service/product/product.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;
  url : any
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private alertController:AlertController,
    private service :ProductService
  ) {
    this.initializeApp();
    this.backButtonEvent();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  backButtonEvent() {
    
    this.platform.backButton.subscribeWithPriority(1, () => {
      this.url = this.router.url.split('/');
      if (this.router.url == "/tabs/home") {
        this.AlertBoxHandler();
      } else if(this.router.url == "/login"){
        navigator["app"].exitApp();
      }
      // else if(this.router.url == "/"){
      //   navigator["app"].exitApp();
      // }
      else{
        window.history.back();
      }
    });
    }


    async AlertBoxHandler(){
      const alert = await this.alertController.create({
        header: 'Confirm!',
        message: 'Are You Sure <strong>Exit App</strong>!!!',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'yes',
            handler: () => {
              navigator['app'].exitApp();
            }
          }
        ]
      });
  
      await alert.present();
    }
}
