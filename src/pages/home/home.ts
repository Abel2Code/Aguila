import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MessagePage } from '../message/message';
import { FasPage } from '../fas/fas';
import { QuestionPage } from '../question/question';
import { RewardsPage } from '../rewards/rewards';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  tabOne: any;
  tabTwo: any;
  tabThree: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tabOne = MessagePage;
    this.tabTwo = FasPage;
    this.tabThree = RewardsPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

}
