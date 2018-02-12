import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { LoginSignupApi } from '../../providers/login-signup-api';
import { ChatroomsPage } from '../chatrooms/chatrooms';

@IonicPage()
@Component({
    selector: 'page-sign-up',
    templateUrl: 'sign-up.html',
})
export class SignUpPage {
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

    //list of dropdown options
    //majors
    majors;
    schools;
    minors;

    constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public alertCtrl: AlertController, public loginProvider: LoginSignupApi) {
        this.fillDropdownOptions();
        this.slideOneForm = formBuilder.group({
            email: [''],
            phoneNumber: [''],
            password: [''],
            confirmPass: ['']
        });

        this.slideTwoForm = formBuilder.group({
            confirmationPin: [''],
        });

        this.slideThreeForm = formBuilder.group({
            picture: [''],
            firstName: [''],
            lastName: ['']
        });

        this.slideFourForm = formBuilder.group({
            school: [''],
            year: [''],
            majors: new FormArray([]),
            minors: new FormArray([])
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

    addMajor(){
        //adds a new input for the major
        let majors = this.slideFourForm.get('majors') as FormArray;
        majors.push(new FormControl());
    }

    addMinor(){
        //adds a new input for the minor
        let minors = this.slideFourForm.get('minors') as FormArray;
        minors.push(new FormControl());
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

        // this.submitAttempt = true;

        // if(!this.slideFourForm.valid){
        //     this.invalidForm();
        // }else{
            let signUpForm = new FormData();
            let fileList: any = document.getElementById('pic');
            let fileToUpload = fileList.files[0];
            signUpForm.set('pic' , fileToUpload);
            signUpForm.set('email' , this.slideOneForm.value.email);
            signUpForm.set('phoneNumber' , this.slideOneForm.value.phoneNumber);
            signUpForm.set('password' , this.slideOneForm.value.password);
            signUpForm.set('firstName' , this.slideThreeForm.value.firstName);
            signUpForm.set('lastName' , this.slideThreeForm.value.lastName);
            signUpForm.set('school' , this.slideFourForm.value.school);
            signUpForm.set('year' , this.slideFourForm.value.year);
            signUpForm.set('majors' , this.slideFourForm.value.majors);
            signUpForm.set('minors' , this.slideFourForm.value.minors);
            this.loginProvider.signUp(signUpForm).then((data)=>{
                console.log(data);
                this.navCtrl.push(ChatroomsPage);
            });
        // }
    }

    fillDropdownOptions(){
        this.loginProvider.getMajors().then((data) => {
            this.majors=data;
            this.minors=data;
        })
        this.loginProvider.getSchools().then((data) => {
            this.schools=data;
        })
    }
}
