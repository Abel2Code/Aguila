import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';

// Log In / Sign Up
import { LoginPage } from '../pages/login/login';
import { SignUpPage } from '../pages/sign-up/sign-up';

//Home Page
import { HomePage } from '../pages/home/home';
import { HomeMentorPage } from '../pages/home-mentor/home-mentor';

// Providers
import { LoginSignupApi } from '../providers/login-signup-api';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MessagePage } from '../pages/message/message';
import { RewardsPage } from '../pages/rewards/rewards';
import { QuestionPage } from '../pages/question/question';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SignUpPage,
    HomePage,
    MessagePage,
    RewardsPage,
    QuestionPage,
    HomeMentorPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {tabsPlacement: 'top'}),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SignUpPage,
    HomePage,
    MessagePage,
    RewardsPage,
    QuestionPage,
    HomeMentorPage
  ],
  providers: [
    LoginSignupApi,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
