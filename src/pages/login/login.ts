import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { MenuController } from 'ionic-angular';

import { LoginSignupApi } from '../../providers/login-signup-api';

import { SignUpPage } from '../sign-up/sign-up';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-login ',
  templateUrl: 'login.html',
})
export class LoginPage {
  //builds the login form
  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private navCtrl : NavController, private navParams : NavParams, private formBuilder : FormBuilder, private alertCtrl : AlertController, private loginProvider : LoginSignupApi, private menuCtrl : MenuController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  ionViewWillEnter(){
    this.menuCtrl.swipeEnable(false);
  }

  ionViewWillLeave(){
    this.menuCtrl.swipeEnable(true);
  }

  loginButton() {
    //checks if the login form is valid before checking the database
    //if invalid pop up will appear invalid.
    if(this.loginForm.valid == true){
      this.login();
    }else{
      this.invalidCredentials();
    }
  }

  login(): void{
    // Give username and password to server
    this.loginProvider.validateCredentials(this.loginForm.value.email, this.loginForm.value.password).then((data) =>{
      console.log(data);
      this.navCtrl.push(HomePage);
    });
  }

  dev(): void{
    console.log('dev');
    this.navCtrl.push(HomePage);
  }

  invalidCredentials() {
    //pop up that says invalid email / password.
    let alert = this.alertCtrl.create({
      title: 'Invalid Email/Password',
      buttons: ['Dismiss']
    });
    alert.present();
  }

  signUpButton(){
    //sign up button that pushes to the sign up page
    this.navCtrl.push(SignUpPage);
  }

  forgotPasswordButton(){
    //pushes to the forget password page
    
  }

}
