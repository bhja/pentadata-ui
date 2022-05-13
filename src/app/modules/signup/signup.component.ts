import {Component, EventEmitter, Inject, OnInit, Output, ViewChild} from '@angular/core';
import {InstitutionsService, PersonService} from "../../service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {Person} from "../../model/person";
import {ViewPersonService} from "../../service/view-person-service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  isLinear = true;
  form: FormGroup;

  selectedValue: any;

  constructor(private route:ActivatedRoute,private router:Router,private viewPersonService:ViewPersonService,private dialog: MatDialog,
              private personService:PersonService
  ) {
    this.form= new FormBuilder().group({
      first_name: ['',Validators.required],
      last_name : ['' ,Validators.required],
      email : ['', Validators.required]
    });
  }

  ngOnInit(): void {
    console.log("In init");
  }

  submit(form:FormGroup) : void {
    let person:Person = form.value;
     this.personService.createPerson(person).subscribe(
       (data)=> {
         this.viewPersonService.setPersonId(data.response.person_id);
         this.router.navigate(['/banking'],{relativeTo:this.route,queryParams:{action:'add'}});
       }
     );
  }
  }










