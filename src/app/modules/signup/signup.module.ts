import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InstitutionsService, PersonService} from "../../service";

import {SignupComponent} from "./signup.component";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDialogModule} from "@angular/material/dialog";
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from "@angular/material/card";
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from "@angular/material/button";
import {BankingModule} from "../banking/banking-module";
import {BankingRoutingModule} from "../banking/banking-routing.module";
import {BankingComponent} from "../banking/banking.component";
@NgModule({
  declarations: [SignupComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSelectModule,
    MatCardModule,
    MatStepperModule,
    MatButtonModule,
    BankingRoutingModule
  ],
  providers: [
    InstitutionsService,
    PersonService,
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {float: 'always'} }
  ]
})
export class SignupModule {

}
