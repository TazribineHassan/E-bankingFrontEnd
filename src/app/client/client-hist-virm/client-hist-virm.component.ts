import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { Transaction } from 'src/app/models/transaction';
import { ClientTransactionsService } from 'src/app/services/client-transactions.service';
import { NotificationService } from 'src/app/services/notification.service';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-client-hist-virm',
  templateUrl: './client-hist-virm.component.html',
  styleUrls: ['./client-hist-virm.component.css']
})
export class ClientHistVirmComponent implements OnInit, OnDestroy {

  
  public transactions : Transaction[] = [];
  public static nombreTransaction: number = 0;
  private subscriptions : Subscription[] = [];
  constructor(private clientTansactionsService : ClientTransactionsService, private notifier: NotificationService) { }

  getAllTransactions():void{
    this.subscriptions.push(
      this.clientTansactionsService.getTransactions().subscribe(
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

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private sendNotification(notificationType: NotificationType, message: string): void{
    if(message){
      this.notifier.notify(notificationType, message);
    }else{
      this.notifier.notify(notificationType, "An error occured. please try again");
    }
  }

}
