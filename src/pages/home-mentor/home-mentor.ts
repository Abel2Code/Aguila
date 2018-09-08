import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { MessagePage } from '../message/message';
import { QuestionPage } from '../question/question';
import { LoginSignupApi } from '../../providers/login-signup-api';
import { RewardsPage } from '../rewards/rewards';
import { ViewJobPage } from '../view-job/view-job';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home-mentor.html',
})
export class HomeMentorPage {

  layout: String;
  title: String;
  description: String;
  id: String;
  token: String;
  jobs : any;
  viewJobTitle: String;
  viewJobDescription: String;
  conversations : any;
  response: String;
  currentJob: any;

  userInfo: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl : AlertController, private loginProvider : LoginSignupApi, private storage: Storage) {
    this.jobs = [];
    this.conversations = [];
    this.changeLayout(0);
    this.storage.get('id').then((data : any) =>{
      this.id = data;
    }).then(()=>this.getJobs());


    this.storage.get('id').then((data : any) =>{
      this.id = data;
    }).then(()=>this.getConversations());

    this.storage.get('token').then((data : any) =>{
      this.token = data;
    });

    this.loginProvider.getUserInfo().then((userInfo: any) => {
      this.userInfo = userInfo;
      this.storage.set('userInfo', userInfo);
    });

  }

  ionViewDidLoad() { }

  changeLayout(value){
    switch(value){
      case 0:
        this.getJobs();
        this.layout = "question";
        break;
      case 1:
        // this.layout = "points";
        break;
      case 2:
        this.layout = "inbox";
        break;
      case 3:
        this.layout = "view_job";
        break;
      default:
        this.layout = "error";
    }
  }

  getJobs(){
    this.loginProvider.getUnansweredJobs().then((data: any)=>{
      this.jobs = data.reverse();
    });
  }

  openMessage(conversation){
    this.navCtrl.push(MessagePage, conversation);
  }

  print(message){}

  getConversations(){
    this.loginProvider.getMentorConversations(this.id).then((data: any)=>{
      this.conversations = data.reverse();
    });
  }

  openJob(job){
    this.changeLayout(3);
    this.viewJobTitle = job.title;
    this.viewJobDescription = job.description;
    this.response = "";
    this.currentJob = job;
  }

  match(){
    this.loginProvider.jobMatch(this.currentJob._id, this.id).then((data: any)=>{
      this.loginProvider.startConversation(this.currentJob._id, this.currentJob.description, this.response).then((data: any)=>{
        this.loginProvider.getMentorConversations(this.id).then((data: any)=>{
          this.conversations = data.reverse();
          this.changeLayout(2);
        });
      });
    });
  }

  logOut(){
    this.storage.clear();
    this.navCtrl.popToRoot();
  }

}
