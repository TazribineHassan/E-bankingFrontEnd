import { HttpErrorResponse } from '@angular/common/http';
import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { Transaction } from 'src/app/models/transaction';
import { ClientTransactionsService } from 'src/app/services/client-transactions.service';
import { NotificationService } from 'src/app/services/notification.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-client-hist-vers',
  templateUrl: './client-hist-vers.component.html',
  styleUrls: ['./client-hist-vers.component.css']
})
export class ClientHistVersComponent implements OnInit, OnDestroy {

  public transactions : Transaction[] = [];
  public static nombreTransaction: number = 0;
  private subs = new SubSink();
  constructor(private clientTansactionsService : ClientTransactionsService, private notifier: NotificationService) { }

  getAllTransactions():void{
    this.subs.add(
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
    this.subs.unsubscribe();
  }

  private sendNotification(notificationType: NotificationType, message: string): void{
    if(message){
      this.notifier.notify(notificationType, message);
    }else{
      this.notifier.notify(notificationType, "An error occured. please try again");
    }
  }

}
