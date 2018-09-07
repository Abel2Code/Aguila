import { Component, NgZone, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { LoginSignupApi } from '../../providers/login-signup-api';
import { Storage } from '@ionic/storage';

import * as io from 'socket.io-client';

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
  isMentor = false;
  @ViewChild(Content) content: Content;

  conversation: string;

  socketHost: string = "http://localhost:3000/";
  socket: any;
  zone: any;
  headers: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private loginProvider: LoginSignupApi, private storage: Storage) {
    this.loginProvider.getMessages(this.navParams.data._id).then((data: any) => {
      this.messages = data;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagePage');

    this.storage.get('id').then((data: any) => {
      this.userId = data;
      if (this.navParams.data.mentor == this.userId) {
        console.log(this.navParams.data.mentor);
        console.log("Mentor:", this.userId);
        console.log("is a mentor")
        this.isMentor = true;
      }

      this.conversation = this.navParams.data._id
      console.log(this.navParams);

      if (this.conversation == null) {
        this.conversation = "";
      }

      this.socket = io(this.socketHost + this.conversation);

      this.zone = new NgZone({
        enableLongStackTrace: false
      });

      this.socket.emit('add user', this.userId);

      this.socket.on("new message", (msg) => {
        this.zone.run(() => {
          this.messages.push(msg);
          console.log(msg.message);
          // this.content.scrollToBottom();
        })
      });
    });
  }

  addMessage() {
    let message = {
      isMentor: this.isMentor,
      message: this.messageData
    };
    this.messages.push(message);
    this.loginProvider.sendMessage(this.navParams.get('_id'), this.userId, this.messageData)
    this.messageData = "";
    this.socket.emit('new message', message);
  }

  scrollToBottom() {

  }

  goBack() {
    this.navCtrl.pop();
  }

}
