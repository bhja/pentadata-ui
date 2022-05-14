import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Transaction} from "../../../model/transaction";
import {AccountModule} from "../account.module";
import {AccountService} from "../../../service";
import {ActivatedRoute} from "@angular/router";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit,AfterViewInit {

  @ViewChild('paginator') paginator: MatPaginator;
  selectedRowIndex = -1;
  columns:string[] = ['amount','description','merchantName','pending','currency','datetime'];

  loading = false;
  transactions:Transaction[]=[];

  dataSource:MatTableDataSource<Transaction> = new MatTableDataSource<Transaction> ([]);
  accountId:any ;
  constructor(private  active:ActivatedRoute,private accountService:AccountService) {
     active.queryParams.subscribe(params => {
      this.accountId = params['accountId'];
  });
  }

  ngOnInit(): void {
    this.accountService.getTransactions(this.accountId).subscribe((data)=>{
      this.dataSource = new MatTableDataSource<Transaction>(data);
      this.dataSource.paginator = this.paginator;
      this.transactions = data;
    });

  }

  ngAfterViewInit(): void {
  }

}
