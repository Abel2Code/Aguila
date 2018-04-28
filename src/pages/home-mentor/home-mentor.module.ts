import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeMentorPage } from './home-mentor';

@NgModule({
  declarations: [
    HomeMentorPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeMentorPage),
  ],
})
export class HomeMentorPageModule {}
