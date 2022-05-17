import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ViewPersonService} from "../../service/view-person-service";
import {PersonService} from "../../service";

@Component({
  selector: 'app-banking',
  templateUrl: './banking.component.html',
  styleUrls: ['./banking.component.css']
})
export class BankingComponent implements OnInit {
    add = false;
    account = false;
    link = false;
  constructor(private  active:ActivatedRoute,private viewService:ViewPersonService,private personService:PersonService) {

    active.queryParams.subscribe(params => {
        let action = params['action'];
        if (action == 'add') {
          this.add = true;
          console.log("Add component" + this.viewService.getPersonId());
        }else if(action =='account'){
          let personId: any = localStorage.getItem('personId') ;
          this.viewService.setPersonId(personId);
          this.account = true;
        }else if(action =='link'){
          this.link = true;
        }
      }
    );
  }

  ngOnInit(): void {

  }

  create() : void{
    this.personService.createPerson(this.viewService.getUserId()).subscribe(
      data=> {
        this.viewService.setPersonId(data.response.person_id);
        console.log(this.viewService.getPersonId());
        this.add = true;
        this.link = false;
      });

  }

}
