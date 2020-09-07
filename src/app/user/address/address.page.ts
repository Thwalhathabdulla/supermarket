import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { LoginService} from '../../service/auth/login.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class AddressPage implements OnInit {
  credentialsForm:FormGroup;
  email:any;
  number:any;
  uid:any;
  constructor(
    private storage: Storage,
    private formBuilder:FormBuilder,
    public alert : AlertController,
    public route:Router,
    private service : LoginService
  ) { }

  async ngOnInit() {
    this.credentialsForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      number: ['', [Validators.required,Validators.minLength(9)]]
    });
    await this.storage.get('UID').then(val=>{
      this.uid=val;
    });
    if(!this.uid){
      this.route.navigate(['/login']);
    }
    const userID = {
      uid:this.uid
    }
    //get the user details
    await this.service.getUserDeatils(userID).subscribe(res => {
      // console.log(res['email'])
      this.email=res['email'];
      this.number=res['Phone'];
    });
  }
  
  backbutton(){
    window.history.back();
  }

    //on submit button click
    onSubmit(){
      if(this.credentialsForm.value.number.toString().length == 9)
      {
        const User = {
          uid : this.uid,
          email : this.credentialsForm.value.email,
          Phone : this.credentialsForm.value.number
        }
        this.service.updateUser(User).subscribe(res => {
          let alert = this.alert.create({
            message: res['msg'],
            header: 'Success',
            buttons: ['OK'] 
          });
          alert.then(alert => alert.present());
          this.route.navigate(['/']);
        })
      }
      else{
        let alert = this.alert.create({
          message: "invalid Cridential",
          header: 'Error',
          buttons: ['OK']
        });
        alert.then(alert => alert.present());
      }
    }
  
}
