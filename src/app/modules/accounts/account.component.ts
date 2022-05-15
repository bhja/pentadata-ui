import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AccountService} from "../../service";
import {ViewPersonService} from "../../service/view-person-service";
import {Account} from "../../model/account";
import {MatTableDataSource} from "@angular/material/table";

import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit,AfterViewInit {


  selectedRowIndex = -1;
  columns:string[] = ['bank','account_name','account_type','delete'];
  accounts:Account[] = [];
  loading = false;

  dataSource = new MatTableDataSource<Account> ([]);
  constructor(private route:ActivatedRoute,private router:Router,private accountService:AccountService,private viewPersonService:ViewPersonService) { }

  ngOnInit(): void {
    this.getAccounts();
  }

  ngAfterViewInit(): void {
  }

  delete(rowid: number){
   let account= this.accounts[rowid];
   console.log(JSON.stringify(account));
  }


  getAccounts(){
    this.loading = true;
    this.accountService.getAccounts(this.viewPersonService.getPersonId()).subscribe((data)=>{
      this.loading = false;
      this.dataSource = new MatTableDataSource <Account> (data); //pass the array you want in the table
      this.accounts = data;

    });
  }

  showTransactions(account:Account){
   this.router.navigate(["/transactions"],{relativeTo:this.route,queryParams:{accountId:account.account_id}});


  }
}
