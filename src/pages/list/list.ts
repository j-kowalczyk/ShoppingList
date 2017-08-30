import { Component } from '@angular/core';

import { NavController,
  NavParams,
  ToastController,
  AlertController } from 'ionic-angular';
import { ItemDetailsPage } from '../item-details/item-details';
import { Storage } from '@ionic/storage';
import { SMS } from '@ionic-native/sms';
import { SMSService } from '../../services/sms.service';


@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
  providers: [SMSService]
})
export class ListPage {
  selectedItem: any;
  addedValue: any;
  crossed: any;
  icons: string[];
  prefixMsg: string;
  msg: string;
  phoneNo: string;
  receiverName: string;
  items: Array<{title: string, icon: string}>;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController,
              public alertCtrl: AlertController,
              public storage: Storage,
              private sms: SMS,
              private smsService: SMSService
  ) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    this.crossed = false;
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];
    this.prefixMsg = '';
    this.phoneNo = '';
  }

  ngOnInit(){
    this.items = [];
    this.storage.get('list').then((list)=>{
      for(let item of list) {
        this.items.push({
          title: item.title,
          icon: this.icons[Math.floor(Math.random() * this.icons.length)]
        });
      }
    });

    this.smsService.phoneNo$.subscribe(data => {
      this.phoneNo = data;
    });
    this.smsService.prefixMsg.subscribe(prefixMsg=>{
      this.prefixMsg = prefixMsg;
    });
    this.smsService.receiverName$.subscribe(receiverName=>{
      this.receiverName = receiverName;
    });
  }

  addItem(name, icon = this.icons[Math.floor(Math.random() * this.icons.length)]) {
    this.items.push({
      title: name,
      icon: icon
    });
    this.presentToast(`Item ${name} added`);
    this.updateList(this.items);
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
    this.updateList(this.items);
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

  askForSending() {
    let msgHTML = this.msg.replace(/\n/g, "<br />");
    let confirm = this.alertCtrl.create({
      title: 'Send list',
      message: `You will send that message:<br /><strong>${msgHTML}</strong> <br />to number: <br /><strong>${this.phoneNo} (${this.receiverName})</strong>`,
      buttons: [
        {
          text: 'Send',
          handler: () => {
            this.sms.send(this.phoneNo, this.msg).then(()=>{
              this.presentToast(`SMS sent`);
            });
          }
        },
        {
          text: 'Cancel',
          handler: () => {
          }
        }
      ]
    });
    confirm.present();
  }

  updateList(list) {
    this.storage.set('list', list);
  }

  sendListBySMS() {

    let list = '';
    for(let item of this.items) {
      list+='*'+item.title+'\n';
    }
    this.msg = this.prefixMsg+':\n'+list.slice(0,-1);
    this.askForSending();

  }
}
