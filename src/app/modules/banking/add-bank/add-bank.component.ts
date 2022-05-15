import { Component, OnInit } from '@angular/core';
import {Form, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {InstitutionsService, PersonService,AccountService} from "../../../service";
import {ViewPersonService} from "../../../service/view-person-service";
import {Institution} from "../../../model/institution";
import {debounceTime, Observable, switchMap} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {ConsentComponent} from "../consent/consent.component";


@Component({
  selector: 'app-add-bank',
  templateUrl: './add-bank.component.html',
  styleUrls: ['./add-bank.component.css']
})
export class AddBankComponent implements OnInit {


  selected:any;
  institutions:Institution[] = [];
  //filteredList:Observable<Institution[]>;
  form:FormGroup;


  constructor(private dialog:MatDialog,private accountService:AccountService,
             private institutionService:InstitutionsService,private viewPersonService:ViewPersonService) {

    this.form = new FormBuilder().group({
      bank : ['']
    })

  }

  ngOnInit(): void {
    this.getInstitutions('');

   }

  selectedBank(institution:Institution){
    this.selected = institution;
    const dialogRef = this.dialog.open(ConsentComponent, {
      width: '70%',
      height : '70%',
      disableClose: true ,
      data: { bank: institution.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.proceed){
        this.accountService.createAccount(this.viewPersonService.getPersonId(),this.selected.id).subscribe((data)=>{
          window.location.href=data.response.url;
          //Not a great idea when the viewPersonService should have worked.
          localStorage.setItem("personId",this.viewPersonService.getPersonId());
        })
      }
    });
  }

  getInstitutions(filter:string){
    this.institutionService.institutions(filter).subscribe(data=>{
      this.institutions = data;
      console.log(this.institutions);
    })
  }

}
