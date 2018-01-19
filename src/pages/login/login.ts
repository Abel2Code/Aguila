import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ConversationsPage } from '../conversations/conversations';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  username: String;
  password: String;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(): void{
    // Give username and password to server
    console.log(this.username + "\n" + this.password);
    // On error, tell the user its invalid with styles
    // If valid,
    // Store token in local storage

    // Push to conversations page
    this.navCtrl.setRoot(ConversationsPage);
    
  }

}
