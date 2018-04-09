import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.messages = this.navParams.data.messages;
    console.log(this.messages);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagePage');
  }

  addMessage(){
    this.messages.push({
      isMentor: false,
      message: this.messageData
    });
    this.messageData = "";

    this.messages.push({
      isMentor: true,
      message: "Happy to help. Let me know if my advice resolves the issue."
    })
  }

}
