import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

// Log In / Sign Up
import { LoginPage } from '../pages/login/login';

// Conversations / Messaging
import { ChatroomsPage } from '../pages/chatrooms/chatrooms';
import { ConversationPage } from '../pages/conversation/conversation';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,

    // Log In / Sign Up
    LoginPage,

    // Conversations / Messaging
    ChatroomsPage,
    ConversationPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,

    //Log In / Sign Up
    LoginPage,

    // Conversations / Messaging
    ChatroomsPage,
    ConversationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
