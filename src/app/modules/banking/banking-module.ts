import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {BankingComponent} from "./banking.component";
import {MatCardModule} from "@angular/material/card";
import {AddBankModule} from "./add-bank/add-bank.module";
import {ConsentModule} from "./consent/consent-module";



@NgModule({
  declarations: [BankingComponent],
  imports: [
    CommonModule,
    MatCardModule,
    AddBankModule
   ],
  providers: [

  ]
})
export class BankingModule {

}
