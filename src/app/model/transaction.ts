import * as moment from "moment";
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
    console.log(this.transaction_date);
  }

  get transaction_date() : string {
    let date = moment(this.datetime).format('YYYY-MM-DD HH:mm:ss');
    return date;
  }

  get pending_flag()  : string{
   console.log(this.pending ? "Y" : "N");
   return  this.pending ? "Y" : "N";
  }

}
