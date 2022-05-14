export class Transaction{
  amount : number;
  description : string;
  merchantName : string;
  category : string;
  pending : boolean;
  currency: string;
  location: string;
  datetime: string;

  constructor(obj?: any) {
    Object.assign(this, obj);
  }

}
