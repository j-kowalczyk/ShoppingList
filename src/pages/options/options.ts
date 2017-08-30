import { Component } from '@angular/core';
import { SMSService } from "../../services/sms.service";
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
// import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import { Contacts } from '@ionic-native/contacts';

@Component({
  selector: 'options',
  templateUrl: 'options.html',
  providers: [SMSService, Contacts]
})
export class OptionsPage {
  phoneNo: string;
  prefixMsg: string;
  receiverName: string;
  availablePrefixes: string[];
  contactsFound: any[];
  receiver: {};


  constructor(private smsService: SMSService,
              private contacts: Contacts,
              public toastCtrl: ToastController,
              public storage: Storage) {
    this.contactsFound = [];

    this.contacts.find(["displayName", "name", "phoneNumbers"], {hasPhoneNumber: true, multiple: true})
      .then((contacts) => {
        for (var i=0 ; i < contacts.length; i++){
          if(contacts[i].displayName !== null){
            let obj: any = {};
            obj.name = contacts[i].displayName;
            obj.phoneNo = contacts[i].phoneNumbers[0].value;
            this.contactsFound.push(obj);    // adding in separate array with keys: name, number
          }
        }
        this.contactsFound = this.contactsFound.sort((a, b) =>{
          if(a.name < b.name) return -1;
          if(a.name > b.name) return 1;
          return 0;
        });
      });
  }

  ngOnInit(){
    // this.phoneNo = this.smsService.getPhoneNo();
    this.smsService.phoneNo$.subscribe(data => {
      this.phoneNo = data;
      console.log(this.phoneNo);
    });
    this.smsService.prefixMsg.subscribe(prefixMsg=>{
      this.prefixMsg = prefixMsg;
      console.log(this.prefixMsg);
    });

    this.availablePrefixes = [
      'Trzeba kupić',
      'Hej, kup, proszę',
      'Przypominam o'
    ];
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  contactSelected(receiver){
    this.receiverName = receiver.name;
    this.phoneNo = receiver.phoneNo;
  }

  save() {
    this.smsService.setThings(this.phoneNo, this.prefixMsg, this.receiverName);
    this.presentToast('Options saved');
  }
}
