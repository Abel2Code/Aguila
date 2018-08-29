import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { MessagePage } from '../message/message';
import { QuestionPage } from '../question/question';
import { LoginSignupApi } from '../../providers/login-signup-api';
import { RewardsPage } from '../rewards/rewards';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  layout: String;
  title: String;
  description: String;
  id: String;
  token: String;
  conversations : any;


  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl : AlertController, private loginProvider : LoginSignupApi, private storage: Storage) {
    this.conversations = [];
    this.changeLayout(0);
    this.storage.get('id').then((data : any) =>{
      this.id = data;
    }).then(()=>this.getConversations());


    this.storage.get('token').then((data : any) =>{
      this.token = data;
    });

  }

  ionViewDidLoad() { }

  changeLayout(value){
    switch(value){
      case 0:
        this.layout = "question";
        break;
      case 1:
        this.layout = "points";
        break;
      case 2:
        this.layout = "inbox";
        break;
      default:
        this.layout = "error";
    }
  }

  submitToJobBoard(){
      let data =
        {title: this.title,
        category: "N/A",
        author: this.id,
        description: this.description};

      this.loginProvider.postQuestion(data).then((data : any) =>{
        if(data.message == "Question Posted"){
          let alert = this.alertCtrl.create({
            title: 'Question Posted',
            buttons: ['Great!']
          });
          alert.present();
        } else {
          console.log(data);
          let alert = this.alertCtrl.create({
            title: 'ERROR',
            buttons: ['Dismiss']
          });
          alert.present();
        }
      });;

  }

  getConversations(){
    this.loginProvider.getAskerConversations(this.id).then((data: any)=>{
      this.conversations = data.reverse();
    });
  }

  openMessage(conversation){
    this.navCtrl.push(MessagePage, conversation);
  }

  logOut(){
    this.storage.clear();
    this.navCtrl.popToRoot();
  }

}
