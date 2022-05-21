import {AccountMetadata} from "./account-metadata";

export class Account{
  bank :string;
  account_id: number;
  account_name : string;
  last_opt_in : string;
  account_type : string;
  accountMetadata:AccountMetadata;
}
