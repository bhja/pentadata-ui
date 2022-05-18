import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Transaction} from "../../../model/transaction";
import {AccountService} from "../../../service";
import {ActivatedRoute, Router} from "@angular/router";
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
  accountName:any;
  constructor(private  activeRoute:ActivatedRoute,private router:Router ,private accountService:AccountService
              ) {
    activeRoute.queryParams.subscribe(params => {
      this.accountId = params['accountId'];
      this.accountName = params['accountName'];

  });
  }

  ngOnInit(): void {
    const userId:any =localStorage.getItem("userId")  ;
    this.accountService.getTransactions(this.accountId,userId).subscribe((data)=>{
      this.dataSource = new MatTableDataSource<Transaction>(data);
      this.dataSource.paginator = this.paginator;
      this.transactions = data;
    });

  }

  ngAfterViewInit(): void {
  }

  back(): void{
    this.router.navigate(['/banking'],{relativeTo: this.activeRoute, queryParams: {action: 'account'}}
                         );

  }



}
