import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//Calling the Ably library
import * as Ably from 'ably';
//
let apiKey = "69BujA.cAghQg:0JkNxInDn9VG_9zx";
var realtime = new Ably.Realtime({
  key: apiKey
});
let channel = realtime.channels.get('chatroom');

/**
 * Generated class for the ConversationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-conversation',
  templateUrl: 'conversation.html',
})

export class ConversationPage {
  message: String;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    console.log('Connecting');

    let realtime: Ably.Realtime = new Ably.Realtime({ key: apiKey });

    //Connecting the User
    realtime.connection.once('connected', () => {
      console.log('Connected');
      console.log("Received: " + JSON.stringify(channel.publish));
      window.alert('Connected');
    });
  }
  //Sending a Message
  sendMessage() {
    channel.publish("update", {
      "team": "Man United"
    });
    console.log("Received: " + JSON.stringify(channel.publish));
    console.log(this.message);
  }

  ionViewDidLoad() {
    //Subscribing to a channel
    let channel = realtime.channels.get('channelName');
    channel.subscribe();
    realtime.channels.get('chatroom')
    console.log('"chatroom" exists and is now available globally in every data center');
    console.log('ionViewDidLoad ConversationPage');
  }

}
