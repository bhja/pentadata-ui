import {BaseHttpService} from "./base-http-service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Institution} from "../model/institution";
import {environment} from "../../environments/environment";
import {catchError, map} from "rxjs/operators";
import {Account} from "../model/account";
import {Injectable} from "@angular/core";
import {Transaction} from "../model/transaction";


@Injectable()
export class AccountService extends BaseHttpService{
  constructor(http: HttpClient
  ) {
    super(http);
  }
  /**
   *
   */
  createAccount(personId:string,bank:string): Observable<any> {

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

  getAccounts(personId:string) : Observable<Account[]>{
    const url = environment.api.account.retrieve.url;
    const version = environment.api.consent.version;
    let headers: HttpHeaders = (new HttpHeaders()).set('Accept',
      version).set('Content-Type',version).set('userId','12345');

    return this.http.get<Account[]>(url.replace("{personId}",personId),{ headers})
      .pipe(
        map(response => {
          return response;
        }),
        catchError(this.handleError)
      );

  }

  getTransactions(accountId:any): Observable<Transaction[]> {

    const url = environment.api.account.transactions.url;
    const version = environment.api.account.transactions.version;



    let headers: HttpHeaders = (new HttpHeaders()).set('Accept',
      version).set('Content-Type',
      version).set('userId','1234544');



    return this.http.get<Transaction[]>(url.replace("{accountId}",accountId),
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
