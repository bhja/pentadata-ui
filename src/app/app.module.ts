import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ReportRoutingModule} from "./modules/report/report-routing.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";

import {SignupModule} from "./modules/signup/signup.module";

import { ScrollingModule } from '@angular/cdk/scrolling';
import {SignupRoutingModule} from "./modules/signup/signup-routing.module";




@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        ReportRoutingModule,
        HttpClientModule,
        SignupModule,
        SignupRoutingModule,
      ScrollingModule

    ],
    providers: [


    ],
    exports: [

    ],
    bootstrap: [AppComponent]
})
export class AppModule {


}
