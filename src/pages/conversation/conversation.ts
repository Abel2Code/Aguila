import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//Calling the Ably library
import * as Ably from 'ably';

//Ably Private Key
let apiKey = "69BujA.cAghQg:0JkNxInDn9VG_9zx";
var realtime = new Ably.Realtime({ key: apiKey });


@IonicPage()
@Component({
  selector: 'page-conversation',
  templateUrl: 'conversation.html',
})

export class ConversationPage {
  message: String;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    let realtime: Ably.Realtime = new Ably.Realtime({ key: apiKey });
    let channel = realtime.channels.get('channelName');

    //RECEIVING MESSAGES
    channel.subscribe(function (msg) {
      realtime.channels.get('chatroom').attach(function (err) {
      });
      console.log("Received: " + JSON.stringify(msg.data));
    });
    console.log('Connecting');


    //CONNECTING THE USER
    realtime.connection.once('connected', () => {
      console.log('Connected');
      window.alert('Connected');
    });
  }
  //SENDING MESSAGES

  sendMessage() {

    //   let message = document.getElementById("message");
    //   let finalMessage : any[] =[];
    //   for (var i = message;;); {
    //     finalMessage += message[i];
    // }

    let channel = realtime.channels.get('channelName');
    channel.subscribe('action', function (message) { // implicit attach
      console.log('Message received ' + message.data);
    });
    channel.publish('action', 'boom!');
    console.log(this.message);
  }




  ionViewDidLoad() {

    // console.log('ionViewDidLoad ConversationPage');
  }

}
