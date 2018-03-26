import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { LoginSignupApi } from '../../providers/login-signup-api';
import { HomePage } from '../home/home';

import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
    selector: 'page-sign-up',
    templateUrl: 'sign-up.html',
})
export class SignUpPage {
    //Multiple Slides Form
    @ViewChild('signupSlider') signupSlider: any;

    //Forms on each pages 
    slideOneForm: FormGroup;
    slideTwoForm: FormGroup;
    slideThreeForm: FormGroup;
    slideFourForm: FormGroup;

    //Array of all the forms
    signUpForms;
    //The index of the current slide/form the person is on
    currentFormIndex = 0;

    //The boolean to activate the styling if there is an error in the form
    submitAttempt: boolean = false;

    //checks if email Pin is already sent
    pinSent = false;

    constructor(private navCtrl: NavController, private formBuilder: FormBuilder, private alertCtrl: AlertController, private loginProvider: LoginSignupApi, private storage: Storage) {
        this.slideOneForm = formBuilder.group({
            email: [''],
            password: [''],
            confirmPass: ['']
        });

        this.slideTwoForm = formBuilder.group({
            confirmationPin: [''],
        });

        this.slideThreeForm = formBuilder.group({
            firstName: [''],
            lastName: ['']
        });

        this.slideFourForm = formBuilder.group({
            school: [''],
            year: [''],
            // shareInfo: ['']
        });

        this.signUpForms = [this.slideOneForm, this.slideTwoForm, this.slideThreeForm, this.slideFourForm];
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad SignUpPage');
    }
    
    ngAfterViewInit(){
        //turns off the swiping slides feature to prevent access to next form
        this.lockSwipes();
    }

    lockSwipes(){
        //lock swiping to right or left
        this.signupSlider.lockSwipeToNext(true);
        this.signupSlider.lockSwipeToPrev(true);
    }

    unlockSwipes(){
        //unlock swiping to right or left
        this.signupSlider.lockSwipeToNext(false);
        this.signupSlider.lockSwipeToPrev(false);
    }

    backButton(){
        //cancels registration and returns back to login page
        this.navCtrl.pop();
    }

    next(){
        //changes slide to the next one
        this.unlockSwipes();
        this.signupSlider.slideNext();
        this.currentFormIndex++;
        this.lockSwipes();
    }

    prev(){
        //changes the slide to thep previous slide
        this.unlockSwipes();
        this.signupSlider.slidePrev();
        this.currentFormIndex--;
        this.lockSwipes();
    }

    invalidForm(){
        //Pop up alert that notifys invalid form
        let alert = this.alertCtrl.create({
            title: 'Invalid Form',
            message: 'Please check your form for more details.',
            buttons: ['Dismiss']
        });
        alert.present();
    }

    continueButton(){
        //Checks the form to see if its valid before moving on to the next slide
        this.submitAttempt = true;
        let currentPage = this.signUpForms[this.currentFormIndex];
        if (!currentPage.valid){
            this.invalidForm();
        }else{
            this.submitAttempt = false;
            this.next();
        }
    }

    finishButton(){
        //checks if the last slide is valid before entering the info into the database
        // and changes to the home page

        this.submitAttempt = true;

        if(!this.slideFourForm.valid){
            this.invalidForm();
        }else{
            let signUpForm  = {
                email: this.slideOneForm.value.email,
                password: this.slideOneForm.value.passowrd,
                firstName: this.slideOneForm.value.firstName,
                lastName: this.slideOneForm.value.lastName,
                school: this.slideOneForm.value.school,
                classStanding: this.slideOneForm.value.year,
                // shareInfo: this.slideOneForm.value.shareInfo
            }
            this.loginProvider.signUp(signUpForm).then((data : any)=>{
                if (data.valid == 1){
                    this.storage.set('token', data.token);
                    this.navCtrl.push(HomePage);
                }
            });
        }
    }

    sendPin(){
        if (this.pinSent == false){
            let email = {
                email : this.slideOneForm.value.email
            }
            this.loginProvider.sendEmailPin(email).then((data) => {
                this.pinSent = true;
                console.log(data);
            })
        }
    }

    validatePage(){
        this.continueButton();
        this.sendPin();
    }

    validatePin(){
        let info = {
            email: this.slideOneForm.value.email,
            pin: this.slideTwoForm.value.confirmationPin
        };
        this.loginProvider.checkValidationPin(info).then((data : any) => {
            if (data.valid == 1){
                this.continueButton();
            }else {
                this.invalidPin();
            }
        })
    }

    invalidPin(){
        let alert = this.alertCtrl.create({
            title: 'Invalid Pin',
            message: 'Please reenter pin.',
            buttons: ['Dismiss']
        });
        alert.present();
    }
}
