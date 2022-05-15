import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ViewPersonService {

  person_id = new BehaviorSubject<string>('');
  signature = new BehaviorSubject<string>('');

  person = this.person_id.asObservable();
  constructor() { }



  setPersonId(id:string) : void{
    this.person_id.next(id);
  }



  getPersonId(): string{
    return this.person_id.value;
  }

  setSignature(str:string) : void {
    this.signature.next(str);
  }
  getSignature() :string {
    return this.signature.value;
  }
}
