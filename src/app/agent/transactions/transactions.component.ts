import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { Transaction } from 'src/app/models/transaction';
import { NotificationService } from 'src/app/services/notification.service';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  public transactions : Transaction[] = [];
  public static nombreTransaction: number = 0;
  private subscriptions : Subscription[] = [];
  constructor(private transactionService : TransactionService, private notifier: NotificationService) { }

  getAllTransactions():void{
    this.subscriptions.push(
      this.transactionService.getTransactions().subscribe(
        (response : Transaction[] | any) => {
          this.transactions = response;
          this.sendNotification(NotificationType.SUCCESS, `${response.length} transactions loaded successfuly.`);
        },
        (errorResponse : HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
        }
      )
    )
  }
  
  ngOnInit(): void {
    this.getAllTransactions();
  }

  private sendNotification(notificationType: NotificationType, message: string): void{
    if(message){
      this.notifier.notify(notificationType, message);
    }else{
      this.notifier.notify(notificationType, "An error occured. please try again");
    }
  }

}
