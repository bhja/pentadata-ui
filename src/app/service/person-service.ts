import {Injectable} from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {BaseHttpService} from './base-http-service';
import {environment} from "../../environments/environment";
import {Person} from "../model/person";



@Injectable()
export class PersonService extends BaseHttpService {


  constructor(http: HttpClient
  ) {
    super(http);
  }


  createPerson(person:Person){

    const url = environment.api.person.create.url;
    const version = environment.api.person.create.version;
    let headers: HttpHeaders = (new HttpHeaders()).set('Accept',
      version).set('Content-Type',
      version).set('userId','1234544');
    const body: any = {
      //Place holder for any other additional detail
      request :  person
    };


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

  getBankingConsent(personId:string){
    const url = environment.api.person.consent_banking.url;
    console.log("Did this call go over");
    return this.http.get<any>(url.replace("{personId}",String(personId)))
      .pipe(
        map(response => {
          console.log(response);
          return response;
        }),
        catchError(this.handleError)
      );

  }

  sendConsent(signature:string, personId:string,text:string){
    console.log("In here to send user consent" );
    const url = environment.api.consent.url;
    const version = environment.api.consent.version;
    let headers: HttpHeaders = (new HttpHeaders()).set('Accept',
      version).set('Content-Type',version);
    const body: any = {
      //Place holder for any other additional detail
      signature :  signature,
      usecase : 'banking',
      "text" : text
    };

    console.log(JSON.stringify(body));
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
