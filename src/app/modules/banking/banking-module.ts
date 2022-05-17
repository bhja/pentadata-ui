import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {BankingComponent} from "./banking.component";
import {MatCardModule} from "@angular/material/card";
import {AddBankModule} from "./add-bank/add-bank.module";
import {AccountModule} from "../accounts/account.module";
import {MatTab, MatTabGroup, MatTabsModule} from "@angular/material/tabs";
import {TransactionsModule} from "../accounts/transactions/transactions.module";



@NgModule({
  declarations: [BankingComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    AccountModule,
    AddBankModule,
    MatTabsModule,
    TransactionsModule
   ],
  providers: [

  ]
})
export class BankingModule {

}
