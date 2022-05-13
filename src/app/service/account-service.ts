import {BaseHttpService} from "./base-http-service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Institution} from "../model/institution";
import {environment} from "../../environments/environment";
import {catchError, map} from "rxjs/operators";
import {Account} from "../model/account";
import {Injectable} from "@angular/core";


@Injectable( )
export class AccountService extends BaseHttpService{
  constructor(http: HttpClient
  ) {
    super(http);
  }
  /**
   *
   */
  createAccount(personId:string,bank:string): Observable<string> {

    const url = environment.api.account.create.url;
    const version = environment.api.account.create.version;
    const redirectUri = environment.api.account.create.redirect_uri;


    let headers: HttpHeaders = (new HttpHeaders()).set('Accept',
      version).set('Content-Type',
      version).set('userId','1234544');
    const body: any = {
      //Place holder for any other additional detail
      request : {
        bank: bank,
        person_id : personId,
        redirect_uri : redirectUri
    }};


    return this.http.post<string>(url,
      body,
      { headers })
      .pipe(
        map(response => {
          console.log(JSON.stringify(response))
          return response;
        }),
        catchError(this.handleError)
      );
  }


}
