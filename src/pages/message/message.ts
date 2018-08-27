import { Component,NgZone, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content  } from 'ionic-angular';
import { LoginSignupApi } from '../../providers/login-signup-api';
import { Storage } from '@ionic/storage';

// import * as io from 'socket.io-client';

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

 //socketHost: string = "http://localhost:3000/";
 //socket: any;
 //zone: any;
// headers: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private loginProvider : LoginSignupApi, private storage: Storage) {
    this.messages = this.navParams.data.messages;
    console.log(this.messages);
    this.storage.get('id').then((data : any) =>{
      this.userId = data;
      if(this.navParams.get('mentor') == this.userId){
        console.log("is a mentor")
        this.isMentor = true;
      }

      this.conversation = this.navParams.get('conversation');

      if(this.conversation == null){
        this.conversation = "";
      }

      /*this.socket = io.connect(this.socketHost + this.conversation);

          console.log('tried');
      this.zone = new NgZone({
        enableLongStackTrace: false
      });*/

      /*this.socket.emit('add user', this.userId)
		  this.socket.on("new message", (msg) =>{
			this.zone.run(()=>{
			  console.log(msg);
			  this.messages.push(msg);
			  this.content.scrollToBottom();
			})*/
  });


    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagePage');
  }

  addMessage(){
    this.messages.push({
      isMentor: this.isMentor,
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
