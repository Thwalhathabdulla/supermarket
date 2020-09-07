import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService} from '../service/auth/login.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentialsForm:FormGroup;
  loader:any
  constructor(
    private formBuilder:FormBuilder,
    public alert : AlertController,
    public route:Router,
    private authservice:LoginService,
    private loadingController: LoadingController
    ) { }

  ngOnInit() {
    this.credentialsForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      number: ['', [Validators.required]]
    });
  }

  //on submit button click
  async onSubmit(options: any = {}){
    this.loader = await this.loadingController.create(options);
    await this.loader.present();
    setTimeout(() => {
      this.loader.dismiss();
    }, 5000);
    await this.authservice.login(this.credentialsForm.value).subscribe(async res=>{
      this.dismissloader();
    });
    
  }
  async dismissloader(){
    await this.loader.dismiss()
      .then(()=>{
        this.loader = null;
      })
      .catch(e => console.log(e));
  }

}
