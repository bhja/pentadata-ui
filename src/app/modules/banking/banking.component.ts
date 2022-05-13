import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-banking',
  templateUrl: './banking.component.html',
  styleUrls: ['./banking.component.css']
})
export class BankingComponent implements OnInit {

   add = false;
   account = false;

  constructor(private  active:ActivatedRoute) {
    active.queryParams.subscribe(params => {
        let action = params['action'];
        console.log('queryParams', params['action']);
        if (action == 'add') {
          this.add = true;
          console.log("Add component");
        }else{
          this.account = true;
        }
      }
    );


  }

  ngOnInit(): void {

  }

}
