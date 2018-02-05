import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//Calling the Ably library
import * as Ably from 'ably';

//Ably Private Key
let apiKey = "69BujA.cAghQg:0JkNxInDn9VG_9zx";

//Ably SandBox Key
//let apiKey = "a4UEvw.4xWnlQ:XKehqvDKDH59fmuB";
var realtime = new Ably.Realtime({ key: apiKey, clientId: "User 1" });


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

    //Receiving Messages
    channel.subscribe(function (msg) {
      realtime.channels.get('chatroom').attach(function (err) {
      });
      console.log("Received: " + JSON.stringify(msg.data));
    });

    

    //Connecting the User
    console.log('Connecting');
    realtime.connection.once('connected', () => {
      console.log('Connected');
      window.alert('Connected');
    });
  }

  
  //Sending a Message

  sendMessage() {
    //ATTEMPT TO CREATE CHANGING MESSAGES
    //   let message = document.getElementById("message");
    //   let finalMessage : any[] =[];
    //   for (var i = message;;); {
    //     finalMessage += message[i];
    // }
    // console.log(finalMessage);

    let channel = realtime.channels.get('channelName');
    channel.subscribe('action', function (message) { 
      console.log('Message received ' + message.data);
    });
    channel.publish('action', 'boom!');

    //SHOWING CHAT HISTORY
    channel.attach(function(err) {
      channel.history({ untilAttach: true}, function(err, resultPage) {
        var lastMessage = resultPage.items[0];
        console.log('Last message before attach: ' + lastMessage.data);
      });
    });
    
    console.log(this.message);
  }




  ionViewDidLoad() {
    //Authentication Token
    realtime.auth.requestToken({ clientId: 'bob'}, function(err, tokenDetails){
      if(err) {
        console.log('An error occurred; err = ' + err.message);
      } else {
        console.log('Success; token = ' + tokenDetails.token);
      }
    });
    //Presence for who entered
    let channel = realtime.channels.get('channelName');
    channel.presence.subscribe('enter', function(member) {
      console.log('Member ' + member.clientId + ' entered');
    });
    channel.presence.enter();
   
    // console.log('ionViewDidLoad ConversationPage');
  }

}
