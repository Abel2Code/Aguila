import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginSignupApi } from '../../providers/login-signup-api';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the MessagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
})
export class MessagePage {
  messages: any;
  messageData: String;
  userId;

  constructor(public navCtrl: NavController, public navParams: NavParams, private loginProvider : LoginSignupApi, private storage: Storage) {
    this.messages = this.navParams.data.messages;
    console.log(this.messages);
    this.storage.get('id').then((data : any) =>{
      this.userId = data;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagePage');
  }

  addMessage(){
    this.messages.push({
      isMentor: false,
      message: this.messageData
    });
    this.loginProvider.sendMessage(this.navParams.get('_id'), this.userId, this.messageData)
    this.messageData = "";
  }

  pushCustomReply(){
    this.messages.push({
      isMentor: true,
      message: "Happy to help. Let me know if my advice resolves the issue."
    });
    console.log(this.messages);
  }

  scrollToBottom(){

  }

  goBack(){
    this.navCtrl.pop();
  }

}
