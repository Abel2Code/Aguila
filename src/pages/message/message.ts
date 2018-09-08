import { Component, NgZone, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { LoginSignupApi } from '../../providers/login-signup-api';
import { Storage } from '@ionic/storage';
import { ProviderConstants } from '../../providers/login-signup-api';

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
  @ViewChild('messageBox') private messageBox: ElementRef;

  conversation: string;

  socketHost: string = ProviderConstants.domain;
  socket: any;
  zone: any;
  headers: any;

  mentorInfo: JSON;

  constructor(public navCtrl: NavController, public navParams: NavParams, private loginProvider: LoginSignupApi, private storage: Storage) {
    this.loginProvider.getMessages(this.navParams.data._id).then((data: any) => {
      this.messages = data;
    });
  }

  ionViewDidLoad() {

    this.storage.get('id').then((data: any) => {
      this.userId = data;
      if (this.navParams.data.mentor == this.userId) {
        this.isMentor = true;
      }

      this.conversation = this.navParams.data._id

      if (this.conversation == null) {
        this.conversation = "";
      }

      if(!this.isMentor){
        this.loginProvider.getMentorInfo(this.navParams.data.mentor).then((mentorInfo: any) => {
          this.mentorInfo = mentorInfo;
        });
      }

      this.scrollToBottom();

      this.socket = io(this.socketHost + this.conversation);

      this.zone = new NgZone({
        enableLongStackTrace: false
      });

      this.socket.emit('add user', this.userId);

      this.socket.on("new message", (msg) => {
        this.zone.run(() => {
          this.messages.push(msg);
          this.scrollToBottom();
        })
      });
    });
  }

  addMessage() {
    if(this.messageData == null || this.messageData == ''){
      return;
    }

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
    try {
      // Using SetTimeout is hacky. See if a better solution can be found to scroll to bottom after html updates.
      setTimeout(()=>{
        this.messageBox.nativeElement.scrollTop = this.messageBox.nativeElement.scrollHeight;
      }, 100);
    } catch(err){ }
  }

  goBack() {
    this.navCtrl.pop();
  }

}
