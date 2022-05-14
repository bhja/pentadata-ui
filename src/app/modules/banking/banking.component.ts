import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ViewPersonService} from "../../service/view-person-service";

@Component({
  selector: 'app-banking',
  templateUrl: './banking.component.html',
  styleUrls: ['./banking.component.css']
})
export class BankingComponent implements OnInit {
    add = false;
    account = false;

  constructor(private  active:ActivatedRoute,private viewService:ViewPersonService) {
    active.queryParams.subscribe(params => {
        let action = params['action'];
        if (action == 'add') {
          this.add = true;
          console.log("Add component" + this.viewService.getPerson());
        }else{
          let personId: any = localStorage.getItem('personId') ;
          this.viewService.setPersonId(personId);
          this.account = true;
        }
      }
    );
  }

  ngOnInit(): void {

  }

}
