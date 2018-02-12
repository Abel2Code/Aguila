import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';

import { LoginSignupApi } from '../../providers/login-signup-api';

import { ChatroomsPage } from '../chatrooms/chatrooms';
import { SignUpPage } from '../sign-up/sign-up';

@IonicPage()
@Component({
  selector: 'page-login ',
  templateUrl: 'login.html',
})
export class LoginPage {
  //builds the login form
  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
    profilePhoto: ['', Validators.required],
  });

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public alertCtrl: AlertController, public loginProvider: LoginSignupApi) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
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
      console.log("Data:");
      console.log(data);
      // this.navCtrl.setRoot(ChatroomsPage);
    });
    console.log(this.loginForm.value.email + "\n" + this.loginForm.value.password);
    // On error, tell the user its invalid with styles
    // If valid,
    // Store token in local storage

    // Push to conversations page
  }

  dev(): void{
    console.log('dev');
    //Just a tool for me to skip to the page i want to see.
    let form = new FormData();
    let fileList: any = document.getElementById('pic');
    console.log(fileList.files);
    let fileToUpload = fileList.files[0];
    console.log(fileToUpload);
    form.set('pic' , fileToUpload);
    form.set('hello', 'hello');
    console.log(form);
    this.loginProvider.upload(form).then(()=>{
      console.log('here');
    });
    // //this.navCtrl.push(SignUpPage);
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
    //pushes to the foget password page

  }

}
