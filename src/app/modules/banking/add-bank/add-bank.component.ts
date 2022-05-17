import { Component, OnInit } from '@angular/core';
import {Form, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {InstitutionsService, PersonService,AccountService} from "../../../service";
import {ViewPersonService} from "../../../service/view-person-service";
import {Institution} from "../../../model/institution";
import {debounceTime, distinctUntilChanged, filter, finalize, Observable, switchMap, tap} from "rxjs";
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
  default :any;
  //filteredList:Observable<Institution[]>;
  form:FormGroup;
  isLoading= false;
  initial = true;


  constructor(private dialog:MatDialog,private accountService:AccountService,
             private institutionService:InstitutionsService,private viewPersonService:ViewPersonService) {

    this.form = new FormBuilder().group({
      bank : ['']
    })

  }

  ngOnInit(): void {
    this.getInstitutions('');
    this.form.get('bank')?.valueChanges.
    pipe(
      filter(res => {
        return res !== null && res.length >= 3
      }),
      distinctUntilChanged(),
      debounceTime(1000),
      tap(() => {
        this.institutions = [];
        this.isLoading = true;
      }),
      switchMap(value => this.institutionService.institutions(value)
        .pipe(
          finalize(() => {
            this.isLoading = false
          }),
        )
      )
    )
      .subscribe((data: any) => {
        if (data == []) {
          this.institutions = this.default;
        } else {
          this.institutions = data;
        }

      });
   }

  selectedBank(institution:Institution){
    this.selected = institution;
    const dialogRef = this.dialog.open(ConsentComponent, {
      width: '70%',
      height : '40%',
      disableClose: true ,
      data: { bank: institution.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.proceed){
        this.accountService.createAccount(this.viewPersonService.getPersonId(),this.selected.id,this.viewPersonService.getUserId()).subscribe((data)=>{
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
      if(this.initial) {
        //The first 100 will be displayed when user clears the search. Dont have to go back to the database.
        this.default = data;
        this.initial = false;
      }
    })
  }

  clear():void{
    this.form.get('bank')?.setValue('');
    this.institutions = this.default;
  }

}
