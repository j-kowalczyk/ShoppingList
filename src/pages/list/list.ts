import { Component } from '@angular/core';

import { NavController,
  NavParams,
  ToastController,
  AlertController } from 'ionic-angular';
import { ItemDetailsPage } from '../item-details/item-details';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  addedValue: any;
  crossed: any;
  icons: string[];
  items: Array<{title: string, icon: string}>;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController,
              public alertCtrl: AlertController,
              public storage: Storage
  ) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    this.crossed = false;
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    storage.forEach( (value, key, iterationNumber) => {
      this.items.push({
        title: key,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    });

  }

  addItem(name, icon = this.icons[Math.floor(Math.random() * this.icons.length)]) {
    this.items.push({
      title: name,
      icon: icon
    });
    this.presentToast(`Item ${name} added`);
    this.storage.set(name, this.items.length);
    this.addedValue = '';
  }

  itemTapped(event, item) {
    this.navCtrl.push(ItemDetailsPage, {
      item: item
    });
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  deleteItem(item) {
    this.items.splice (this.items.indexOf(item), 1);
    this.storage.remove(item.title);
  }

  askForDeleting(evt, item) {
    let item_p = item;
    let confirm = this.alertCtrl.create({
      title: 'Delete',
      message: 'Do you want to delete that item?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.deleteItem(item_p);
          }
        },
        {
          text: 'No',
          handler: () => {
          }
        }
      ]
    });
    confirm.present();
  }
}
