import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import {Subject} from "rxjs/Rx";

@Injectable()
export class SMSService {
  private phoneNo: string;

  private phoneNoObs = new Subject<string>();
  private receiverName = new Subject<string>();
  private prefixMessage = new Subject<string>();

  phoneNo$ = this.phoneNoObs.asObservable();
  prefixMsg = this.prefixMessage.asObservable();
  receiverName$ = this.receiverName.asObservable();

  constructor(private storage: Storage) {
    this.storage.get('options').then((options)=>{
      this.prefixMessage.next(options.prefixMsg);

      this.phoneNo = options.phoneNo;
      this.phoneNoObs.next(this.phoneNo);
      this.receiverName.next(options.receiverName);
    });
  }
  setThings(phoneNo, prefixMessage, name) {
    this.phoneNo = phoneNo;
    this.prefixMessage = prefixMessage;
    this.receiverName = name;
    this.storage.set('options', {
      phoneNo: this.phoneNo,
      prefixMsg: this.prefixMessage,
      receiverName: this.receiverName
    });
  }
}
