import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { CartService} from '../../service/cart/cart.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user : any;
  current : any;
  address : any;
  constructor(
    private storage : Storage,
    private router  : Router,
    private service : CartService,
    private alertController : AlertController
  ) { }

  async ngOnInit() {
    await this.storage.get("UID").then(val=>{
      this.user=val;
    });

    if(!this.user)
      {
        this.router.navigate(['/login'])
      }
      await this.storage.get("address").then(val =>{
        this.current=val;
        // console.log(val)
      });
      const userObj={
        uid:this.user
      }
      await this.service.getaddress(userObj).subscribe(res=>{
        if(res.length!=0)
        {
           for(let i=0;i<res.length;i++)
           {
            if(JSON.stringify(this.current)==JSON.stringify(res[i]))
            // if(this.current === res[i]) 
            {res[i].active= true;}
            else
            {
            res[i].active= false;}
            // console.log(res[i].active)
           }
           this.address=res
          //  console.log()
        }
      })
  }
  ionViewWillEnter(){
    this.ngOnInit();
  }

  backbutton(){
    window.history.back();
  }
  
  //add address
  async addaddress(){
    let alert = this.alertController.create({
      header: 'Add Addres',
      inputs: [
        {
          name: 'Name',
          placeholder: 'Name'
        },
        {
          name: 'BuildingNo',
          placeholder: 'Building Number'
        },
        {
          name: 'Street',
          placeholder: 'Street/Flat/Land mark',
          // value:this.Lstreet
        },
        {
          name: 'Postal',
          placeholder: 'Postal Code',
          type:'number',
          // value:this.Lpostal
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
            if (data.Name && data.BuildingNo && data.Street && data.Postal &&data.Phone) {
              // logged in!
              // console.log("done");
              let newaddr = {
                Uid:this.user,
                name : data.Name,
                Buildinf:data.BuildingNo,
                Street:data.Street,
                Postal:data.Postal,
                phone:data.Phone
              }

              //service call add new address

              this.service.addAddress(newaddr).subscribe(res=>{
                this.getupdate();
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
  //update address
  getupdate(){
    const userObj={
      uid:this.user
    }
    this.service.getaddress(userObj).subscribe(res=>{
      if(res.length!=0)
      {
         for(let i=0;i<res.length;i++)
         {
          if(JSON.stringify(this.current)==JSON.stringify(res[i])) 
          res[i].active= true;
          else
          res[i].active= false;
         }
         this.address=res
      }
    })
  }
  //set default address
  activeAddr(index){
    this.address[index].active= false;
    this.current =  this.address[index];
    this.current.active = true;
    this.storage.set("address",this.address[index]);
    this.ngOnInit();
  }

  //delete address
  async delete(id,index){
    // this.address.splice(index, 1);
    const obj ={
      ID : id
    }
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Do you want to Delete Address!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
           
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.service.deleteaddress(obj).subscribe(res =>{
              console.log(res);
              this.address.splice(index, 1);
              this.storage.set('address',"")
            });
          }
        }
      ]
    });

    await alert.present();
    // this.checkoutservice.deleteaddress(obj).subscribe();

  }

  //edit Assress
  async edit(id,index){
    
    let alert = this.alertController.create({
      header: 'Add Addres',
      inputs: [
        {
          name: 'Name',
          placeholder: 'Name',
          value:this.address[index].name
        },
        {
          name: 'BuildingNo',
          placeholder: 'Building Number',
          value:this.address[index].Buildinf
        },
        {
          name: 'Street',
          placeholder: 'Street/Flat/Land mark',
          value:this.address[index].Street
          // value:this.Lstreet
        },
        {
          name: 'Postal',
          placeholder: 'Postal Code',
          type:'number',
          value:this.address[index].Postal
          // value:this.Lpostal
        },
        {
          name: 'Phone',
          type:'number',
          placeholder: 'Phone Number',
          value:this.address[index].Phone
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
          text: 'update',
          handler: data => {
            if (data.Name && data.BuildingNo && data.Street && data.Postal &&data.Phone) {
              // logged in!
              // console.log("done");
              let addr = {
                addrid:id,
                name : data.Name,
                Buildinf:data.BuildingNo,
                Street:data.Street,
                Postal:data.Postal,
                phone:data.Phone
              }
              //service call add new address

              this.service.updateaddr(addr).subscribe(res=>{
                this.getupdate();
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

}
