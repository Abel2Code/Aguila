import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoginSignupApi } from '../../providers/login-signup-api';

import { ChatroomsPage } from '../chatrooms/chatrooms';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  username: String;
  password: String;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loginProvider: LoginSignupApi) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(): void{
    // Give username and password to server
    this.loginProvider.validateCredentials(this.username, this.password).then((data) =>{
      console.log("Data:")
      console.log(data);
      // this.navCtrl.setRoot(ChatroomsPage);
    });
    console.log(this.username + "\n" + this.password);
    // On error, tell the user its invalid with styles
    // If valid,
    // Store token in local storage

    // Push to conversations page
    
    
  }

}
