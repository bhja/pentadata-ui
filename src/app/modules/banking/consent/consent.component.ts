import {Component, Inject, Input, OnInit} from '@angular/core';
import {PersonService} from "../../../service";

import {MatCheckboxChange} from "@angular/material/checkbox";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-consent',
  templateUrl: './consent.component.html',
  styleUrls: ['./consent.component.css']
})
export class ConsentComponent implements OnInit {

  checked=false;
  postUrl:any;
  messageTemplate = [
    "You authorize and direct {{bank}} to share information about yourself, your {{bank}} relationship and your accounts at {{bank}} with Pentadata, (a third party).",
    "You should use caution and ensure that the privacy and security of your information is appropriately protected by them and other third parties with whom you share your information.",
    "Use of your information by the third party is governed by your agreement with them, not by {{bank}}",
    "You can revoke future access at anytime."
  ];
  consentMessage:string[] = [];
  constructor(public dialogRef: MatDialogRef<ConsentComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,private  personService:PersonService) {
  }

  ngOnInit(): void {
    //Remove the older signatures if any.
    localStorage.removeItem('signature');
    const personId:any = localStorage.getItem('personId');
    this.personService.getBankingConsent(personId).subscribe(
      (data => {
        this.postUrl = data.response.consent_post_url;
        localStorage.setItem('signature',data.response.signature);
      })
    );

  }



  getMessage(message:string):string {
     message = message.replace(new RegExp("{{bank}}",'g'),this.data.bank);
     this.consentMessage.push(message);
     return message;
  }

  sendUserConsent(event:MatCheckboxChange):void{
    this.checked = event.checked;
  }

  launch():void{
    const text = this.consentMessage.join("\n");
    const signature:any = localStorage.getItem('signature');
    const personId:any = localStorage.getItem('personId');

    this.personService.sendConsent(signature,personId,text,this.postUrl).subscribe(
      (data)=>{
        this.dialogRef.close({
            proceed:true
        });
      }
    );
  }

  close(){
    this.dialogRef.close({
      proceed: false
    });
  }

}
