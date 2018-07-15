import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { MenuController } from 'ionic-angular';

import { LoginSignupApi } from '../../providers/login-signup-api';

import { SignUpPage } from '../sign-up/sign-up';
import { HomePage } from '../home/home';
import { HomeMentorPage } from '../home-mentor/home-mentor';
import { QuestionPage } from '../question/question';

import { Storage } from '@ionic/storage';


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

  constructor(private navCtrl : NavController, private navParams : NavParams, private formBuilder : FormBuilder, private alertCtrl : AlertController, private loginProvider : LoginSignupApi, private menuCtrl : MenuController, private storage: Storage) {

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
    this.loginProvider.validateCredentials(this.loginForm.value.email, this.loginForm.value.password).then((data : any) =>{
    // this.loginProvider.validateCredentials("a@a.b","12345").then((data : any) =>{
      if (data.valid == 1){
        this.storage.set('token', data.token).then((a: any) => {
          this.storage.set('id', data.id).then((b: any) => {
            this.navCtrl.push(HomePage);
          });
        });
      }else if (data.valid == 2){
        this.storage.set('token', data.token).then((a:any)=> {
          this.storage.set('id', data.id).then((b: any) => {
            this.navCtrl.push(HomeMentorPage);
          });
        });
      } else {
        console.log(data)
        this.invalidCredentials();
      }
    });
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

  dev(): void{
    console.log('dev');
    this.navCtrl.push(HomePage  );
  }

  forgotPasswordButton(){
    //pushes to the forget password page

  }

}
