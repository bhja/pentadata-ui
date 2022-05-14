import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AccountRoutingModule} from "./modules/accounts/account-routing.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";

import {SignupModule} from "./modules/signup/signup.module";

import { ScrollingModule } from '@angular/cdk/scrolling';
import {SignupRoutingModule} from "./modules/signup/signup-routing.module";
import {AccountService, InstitutionsService, PersonService} from "./service";
import {ViewPersonService} from "./service/view-person-service";
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {BankingModule} from "./modules/banking/banking-module";
import {AccountModule} from "./modules/accounts/account.module";
import {AddBankModule} from "./modules/banking/add-bank/add-bank.module";
import {TransactionsModule} from "./modules/accounts/transactions/transactions.module";




@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        AccountRoutingModule,
        HttpClientModule,
        SignupModule,
        SignupRoutingModule,
        ScrollingModule,
      MatTableModule,
      MatIconModule,
      BankingModule,
      AccountModule,
      AddBankModule,
      TransactionsModule

    ],
    providers: [
      InstitutionsService,
      PersonService,
      AccountService,
      ViewPersonService

    ],
    exports: [

    ],
    bootstrap: [AppComponent]
})
export class AppModule {


}
