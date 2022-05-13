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
  filteredList:Observable<Institution[]>;
  form:FormGroup;


  constructor(private dialog:MatDialog,private accountService:AccountService,
             private institutionService:InstitutionsService,private viewPersonService:ViewPersonService) {


  }

  ngOnInit(): void {
    this.form = new FormBuilder().group({
      bank : ['']
     })
    this.institutionService.institutions('').subscribe(data=>{
      this.institutions = data;
      console.log(this.institutions);
    })

  //   this.filteredList = this.form.get('userInput').valueChanges
  //     .pipe(
  //       debounceTime(300),
  //       switchMap(value => this.institutionService.institutions(value))
  //     );
   }

  selectedBank(institution:Institution){
    this.selected = institution;
    console.log("Selection made" +institution.id + institution.name);
    const dialogRef = this.dialog.open(ConsentComponent, {
      width: '70%',
      height : '70%',
      disableClose: true ,
      data: { bank: institution.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.continue){

        this.accountService.createAccount(this.viewPersonService.getPerson(),this.selected.name).subscribe((data)=>{
          console.log("Recevied the call" + data);
        })
      }

    });
  }


}
