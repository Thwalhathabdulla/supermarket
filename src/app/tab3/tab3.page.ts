import { Component }        from '@angular/core';
import { Storage }          from "@ionic/storage";
import { ProductService}    from '../service/product/product.service';
import { CartService }      from '../service/cart/cart.service';
import { LoginService}                   from '../service/auth/login.service';
import { AlertController, ActionSheetController, ModalController, IonRouterOutlet }  from '@ionic/angular';
import { Geolocation }      from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { ConfirmPage }      from '../order/confirm/confirm.page';

import { Router } from '@angular/router';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  cart      : any = [];
  UserId    : any;
  cartresult: Boolean = false;
  user      : any;
  address   : any;
  addressId : any;
  latitute  : any;
  longitude : any;
  location  : any;
  Lstreet   : any;
  Lpostal   : any;
  constructor(
    private storage         : Storage,
    private alertController : AlertController,
    private productService  : ProductService,
    private geolocation     : Geolocation,
    private cartservice     : CartService,
    private router          : Router,
    private authservice     : LoginService,
    private nativeGeocoder  : NativeGeocoder,
    private actionSheetController : ActionSheetController,
    private routerOutlet    : IonRouterOutlet,
    private Modalcontroller : ModalController
  ) {}
  async ngOnInit() { 
    this.storage.get('UID').then(res=>{
      this.UserId = res
    })
  }
  async ionViewWillEnter(){
    this.storage.get('UID').then(res=>{
      this.UserId = res
    })
    await this.productService.loaddata().then(res=>{
      this.cart = res;
    });
    if(this.cart.length !=0){
      this.cartresult = true;
    }else{
      this.cartresult = false;
    }

    //check the user is valid
    this.storage.get("UID").then(async val=>{
      this.user=val;
      if(this.user){
        await this.storage.get("address").then(val =>{
          this.address  = val;
          if (!this.address) {
            const userObj={
              uid:this.user
            }
            this.cartservice.getaddress(userObj).subscribe(res=>{
              if(res.length!=0)
              {
                // console.log(res)
                this.address=res[0];
                this.addressId=res[0].AddrId;
                this.storage.set("address",this.address)
              }
            })
          }
        });
      }
    });
  }



  //clear cart items
  removecart() {
    this.showAlert();
    this.ionViewWillEnter();
  }

  //confirmation alert controller 
  async showAlert(){
    const alert = await this.alertController.create({
      header: "Confirm!",
      message: "Do You Want To clear Cart!!!",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: blah => {
            // console.log("Confirm Cancel: blah");
          }
        },
        {
          text: "Ok",
          handler: () => {
            this.productService.clearcart();
            this.ionViewWillEnter();
            this.cartresult=false
          }
        }
      ]
    });

    await alert.present();

  }


  //get the total amount
  getTotal() {
    if(this.cart)
    {
      return this.cart.reduce((i, j) => i + j.Rate * j.quantity, 0);
    }
  }

  //discrease the product
  async decreaseProduct(product) {
    await this.productService.decreaseProduct(product).then(data => {
      if(data){
        this.cartresult = false;
       }
      this.ngOnInit();
     })
  }
  //add the product
  addcart(item) {
    this.productService.addProducttocart(item);
    this.ionViewWillEnter();
  }

  //remove item
  async removeCartItem(product) {
    await this.productService.removeProduct(product);
    await this.ionViewWillEnter();
  }
 async checkout(){
    this.authservice.backurl = this.router.url;
    if(!this.user){
      this.router.navigate(['/login']);
    }else{
      const actionSheet = await this.actionSheetController.create({
        header: 'Address',
        buttons: [{
          text: 'Current Location',
          // role: 'destructive',
          icon: 'location-outline',
          handler: () => {
            this.checklocation();
          }
        }, {
          text: 'Add Location',
          icon: 'add',
          handler: () => {
            this.CurAddress()
          }
        }, {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            // console.log('Cancel clicked');
          }
        }]
      });
      await actionSheet.present();
    }
  } 
  async checklocation(){
    this.geolocation.getCurrentPosition().then(async (resp) => {
      this.latitute   = resp.coords.latitude;
      this.longitude  = resp.coords.longitude;
      this.getdistance();
      await this.getLocAddress(this.latitute,this.longitude)
     }).catch((error) => {
       alert('Error getting location'+ error)
      //  console.log('Error getting location', error);
     });
  }

  async getLocAddress(lat,log){
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 1
    };
    await this.nativeGeocoder.reverseGeocode(lat, log, options)
    .then((result) => 
      this.location=result
    )
    .catch((error: any) => console.log(error));
    this.Lstreet=this.location[0]['areasOfInterest'][0]+" , "+this.location[0]['locality'];
    this.Lpostal=this.location[0]['postalCode']
  }
  getdistance()
  {
    let lat1=this.latitute;
    let lat2=25.609173;
    let lng1=this.longitude;
    let lng2=56.270626;
    let distance=this.calculateDistance(lat1,lat2,lng1,lng2)/1000;
    if(distance>4)
    {
      alert("Your Location Is Not Available For The Delivery");
    }
    

  }
  calculateDistance(lat1:number,lat2:number,long1:number,long2:number){
    var R = 6378.137; // Radius of earth in KM
    var dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
    var dLon = long2 * Math.PI / 180 - long1 * Math.PI / 180;
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    return d * 1000; // meters
  }
  async CurAddress()
  {
    // console.log(this.Lstreet)
    // console.log(this.Lpostal)
    let alert = this.alertController.create({
      header: 'Add Addres',
      inputs: [
        {
          name: 'Name',
          placeholder: 'Name'
        },
        {
          name: 'BuildingNo',
          placeholder: 'House Number/Nmae'
        },
        {
          name: 'Street',
          placeholder: 'Street/Flat/Land mark',
          value:this.Lstreet
        },
        {
          name: 'Postal',
          placeholder: 'Postal Code',
          type:'number',
          value:this.Lpostal
        },
        {
          name: 'Phone',
          type:'number',
          placeholder: 'Phone Number'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            // console.log(data.username);
          }
        },
        {
          text: 'Add',
          handler: data => {
            if (data.Name &&data.Phone) {
              // logged in!
              // console.log("done");
              this.address = {
                Uid:this.user,
                name : data.Name,
                Buildinf:data.BuildingNo,
                Street:data.Street,
                Postal:data.Postal,
                phone:data.Phone
              }

              //service call add new address

              this.cartservice.addAddress(this.address).subscribe(async res=>{
                this.storage.set('address',res);
                this.address=res;
                this.addressId=res['AddrId'];
                (await alert).dismiss();
                this.ordernow();
              })
            } else {
              // invalid login
              return false;
            }
          }
        }
      ]
    });
    (await alert).present();
  }
    //view entered address
   async viewaddress(){
     console.log(this.address)
      if(this.user)
      {
        if(!this.address){
          const alert = await this.alertController.create({
            header: "Address",
            message: "You Have No Address is Added",
            buttons: [
              {
                text: "Ok",
                handler: () => {
                  this.checkout()
                }
              }
            ]
          });
      
          await alert.present();
        }else{
          const alert = await this.alertController.create({
            header: this.address.name,
            message: this.address.Buildinf+' '+this.address.Street+'<br>'+this.address.Postal+'<br>'+this.address.Phone,
            buttons: [
              {
                text: "Ok",
                handler: () => {
                  // this.checkout()
                }
              }
            ]
          });
      
          await alert.present();
        }
      }
    }

    async ordernow(){
      if(!this.user){
        this.authservice.backurl = this.router.url;
        this.router.navigate(['/login']);
          return false
      }
      if(!this.address){
        this.CurAddress();
      }else{
        let total=this.getTotal();
        const modal=await this.Modalcontroller.create({
          component:ConfirmPage,
          swipeToClose:true,
          presentingElement: this.routerOutlet.nativeEl,
          cssClass: 'my-custom-modal-css',
          componentProps:{
            'total':total,
            'address':this.address,
            'cart':this.cart
          }
        });
        modal.onDidDismiss().then(() => {
          this.ionViewWillEnter()
          // console.log("enter");
        });
       await modal.present();
      }
    }
}
