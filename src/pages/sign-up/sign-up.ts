import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { AlertController } from 'ionic-angular/components/alert/alert-controller';
//importing validators
import { EmailValidator } from '../../validators/email';
import { PasswordValidator } from '../../validators/password';
import { PictureValidator } from '../../validators/picture';


@IonicPage()
@Component({
    selector: 'page-sign-up',
    templateUrl: 'sign-up.html',
})
export class SignUpPage {
    @ViewChild('signupSlider') signupSlider: any;

    onFileChange($event) {
        let file = $event.target.files[0]; // <--- File Object for future use.
        this.form.controls['imageInput'].setValue(file ? file.name : ''); // <-- Set Value for Validation
   }
   fileName = '';

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

    constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public alertCtrl: AlertController) {
        
        
        this.slideOneForm = formBuilder.group({
            email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
            phoneNumber: ['', Validators.compose([Validators.maxLength(10), Validators.pattern('[0-9]*'), Validators.required])],
            password: [''],
            confirmPass: ['']
        });

        this.slideTwoForm = formBuilder.group({
            confirmationPin: [''],
        });
        
        this.slideThreeForm = formBuilder.group({
            picture:  [''],
            firstName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
            lastName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])]
        });

        this.slideFourForm = formBuilder.group({
            school: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
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
        this.submitAttempt = true;
        if(!this.slideFourForm.valid){
            this.invalidForm();
        }else{
            console.log('Successful Registration');
            //Register into database
            //Push into home page
        }
    }

}
