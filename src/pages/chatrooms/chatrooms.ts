import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ConversationPage } from '../conversation/conversation';
import * as Ably from 'ably';


/**
 * Generated class for the ChatroomsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chatrooms',
  templateUrl: 'chatrooms.html',
})
export class ChatroomsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatroomsPage');
  }

  openConversationsPage(){
    this.navCtrl.push(ConversationPage);
  }

}
