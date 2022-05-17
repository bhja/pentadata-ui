import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ViewPersonService {

  person_id = new BehaviorSubject<string>('');
  signature = new BehaviorSubject<string>('');
  userId = new BehaviorSubject<string>('');

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

  setUserId(id:string) : void {
    this.userId.next(id);
  }



  getUserId(): string{
    return this.userId.value;
  }
}
