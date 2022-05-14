import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ViewPersonService {

  person_id = new BehaviorSubject<string>('');

  person = this.person_id.asObservable();
  constructor() { }



  setPersonId(id:string) : void{
    this.person_id.next(id);
  }



  getPerson(){
    return this.person_id.value;
  }
}
