import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';

// Log In / Sign Up
import { LoginPage } from '../pages/login/login';

// Conversations / Messaging
import { ChatroomsPage } from '../pages/chatrooms/chatrooms';
import { ConversationPage } from '../pages/conversation/conversation';

// Providers
import { LoginSignupApi } from '../providers/login-signup-api';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SignUpPage } from '../pages/sign-up/sign-up';

@NgModule({
  declarations: [
    MyApp,

    // Log In / Sign Up
    LoginPage,
    SignUpPage,

    // Conversations / Messaging
    ChatroomsPage,
    ConversationPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,

    //Log In / Sign Up
    LoginPage,
    SignUpPage,

    // Conversations / Messaging
    ChatroomsPage,
    ConversationPage
  ],
  providers: [
    LoginSignupApi,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
