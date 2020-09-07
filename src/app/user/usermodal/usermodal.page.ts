import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usermodal',
  templateUrl: './usermodal.page.html',
  styleUrls: ['./usermodal.page.scss'],
})
export class UsermodalPage implements OnInit {
  log : any = 'LOGOUT';
  constructor(
    private Modalcontroller : ModalController,
    private alertController : AlertController,
    private storage         : Storage,
    private router          : Router
  ) { }

  ngOnInit() {
    this.storage.get("UID").then(res=>{
      if(res){
        this.log = "LOGOUT";
      }else{
        this.log = "Login"
      }
    })
  }
  //close modal
  async closeModal()
  { 
    await this.Modalcontroller.dismiss()
  }

  //logout
  async logout(){
    if (this.log == "Login") {
      this.closeModal();
      this.router.navigate(['/login']);
    }else{
    const alert = await this.alertController.create({
      header: "Confirm!",
      message: "Are you sure to logout ??",
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
            this.storage.set('UID',"");
            this.router.navigate(['/login'])
            this.closeModal();
            this.storage.set("cart", "");
            this.storage.set("address" , "");
          }
        }
      ]
    });

    await alert.present();
  }
  }
}
