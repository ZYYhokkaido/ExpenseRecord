import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IExpenseItem, IExpenseItemDto } from '../IExpenseItem';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-greeting',
  templateUrl: './greeting.component.html',
  styleUrls: ['./greeting.component.css'],
})
export class GreetingComponent implements OnInit {
  description: string = '';
  type: string = '';
  amount: Number = 0;
  date: string = '';

  expenseList: IExpenseItemDto[] = [];

  private baseUrl: string;
  private http: HttpClient;

  constructor(
    http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    private changeRef: ChangeDetectorRef
  ) {
    this.http = http;
    this.baseUrl = baseUrl;
  }

  ngOnInit(): void {
    this.getApi();
    console.log('this.expenseList2= ' + this.expenseList);
  }

  getApi() {
    this.http
      .get<Observable<any>>(this.baseUrl + 'greeting')
      .subscribe((result: any) => {
        console.log('result1' + result);

        this.expenseList = result.reverse();
        console.log('this.expenseList= ' + this.expenseList);
        console.log(typeof this.expenseList);
      });
  }

  callAddApi() {
    this.http
      .post<Observable<any>>(this.baseUrl + 'greeting', {
        description: this.description,
        type: this.type,
        amount: this.amount,
        date: this.date,
      })
      .subscribe(
        (result: any) => {
          console.log('result2' + result);
          // this.expenseList = result;
          this.getApi();
        },
        (error: any) => console.error(error)
      );
  }

  callDeleteApi(Id: string) {
    this.http
      .delete<Observable<any>>(this.baseUrl + 'greeting/' + Id)
      .subscribe(
        (result: any) => {
          console.log(result);
          this.getApi();
        },
        (error: any) => console.error(error)
      );
  }
}
