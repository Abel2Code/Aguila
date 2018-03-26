import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-question',
  templateUrl: 'question.html',
})
export class QuestionPage {

  questionForm = this.formBuilder.group({
    title: ['', Validators.required],
    body: ['', Validators.required]
  });

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder : FormBuilder) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionPage');
  }

  submit(){

  }

}
