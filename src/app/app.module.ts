import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import { Storage } from '@ionic/storage';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { SMS } from '@ionic-native/sms';
import {OptionsPage} from "../pages/options/options";

// onesig
// Your App ID: 5e72b0ad-6d0d-4052-b605-f139efb771d8
const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '1898ec2a'
  }
  ,
  'push': {
    'sender_id': '1020079643773',
    'pluginConfig': {
      'ios': {
        'badge': true,
        'sound': true
      },
      'android': {
        'iconColor': '#343434'
      }
    }
  }
};

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ItemDetailsPage,
    ListPage,
    OptionsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ItemDetailsPage,
    ListPage,
    OptionsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Storage, SMS]
})
export class AppModule {}
