import { Component, OnInit } from '@angular/core';
import { FormBuilder,  FormGroup} from "@angular/forms";
import {InstitutionsService, AccountService, PersonService} from "../../../service";
import {Institution} from "../../../model/institution";
import {debounceTime, distinctUntilChanged, filter, finalize, Observable, pairwise, switchMap, tap} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {ConsentComponent} from "../consent/consent.component";
import {ActivatedRoute, Router, RoutesRecognized} from "@angular/router";


@Component({
  selector: 'app-add-bank',
  templateUrl: './add-bank.component.html',
  styleUrls: ['./add-bank.component.css']
})
export class AddBankComponent implements OnInit {


  selected:any;
  institutions:Institution[] = [];
  default :any;
  form:FormGroup;
  isLoading= false;
  initial = true;
  consent=false;
  listBanks=false;
  postUrl:any;



  constructor(private active:ActivatedRoute,private router:Router,private dialog:MatDialog,private accountService:AccountService,
             private institutionService:InstitutionsService,private personService:PersonService) {


    this.form = new FormBuilder().group({
      bank : ['']
    })
  }

  ngOnInit(): void {

    localStorage.removeItem('signature');
    const personId:any = localStorage.getItem('personId');
    this.personService.getBankingConsent(personId).subscribe(
      (data => {
        this.postUrl = data.response.consent_post_url;
        localStorage.setItem('signature',data.response.signature);
      })
    );

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
      let person_id:any = localStorage.getItem('personId');
      let userId:any = localStorage.getItem('userId');
      if(result.proceed){
        this.accountService.createAccount(person_id,this.selected.id,userId).subscribe((data)=>{
          window.location.href = data.response.url;
        });
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


  back():void{
      this.router.navigate(['/banking'],
        {relativeTo: this.active, queryParams: {action: 'account'}});
  }

}
