import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { Transaction } from 'src/app/models/transaction';
import { NotificationService } from 'src/app/services/notification.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  public transactions : Transaction[] | any;
  public static nombreTransaction: number = 0;
  constructor(private transactionService : TransactionService, private notifier: NotificationService) { }

  getAllTransactions(showNotif : Boolean):void{
    this.subs.add(
      this.transactionService.getTransactions().subscribe(
        (response : Transaction[] | any) => {
          this.transactions = response;
          if(showNotif){
          this.sendNotification(NotificationType.SUCCESS, `${response.length} transactions loaded successfuly.`);
          }
        },
        (errorResponse : HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
        }
      )
    )
  }
  
  ngOnInit(): void {
    this.getAllTransactions(true);
  }

  searchTransaction(key : string) : void {
    const results : Transaction[] = [];
    for (const transaction of this.transactions) {
      if(transaction.id.toString().indexOf(key.toLowerCase()) !== -1 ||  transaction.nom_verseur.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
      transaction.num_compte.toLowerCase().indexOf(key.toLowerCase()) !== -1  || transaction.montant.toString().indexOf(key.toLowerCase()) !== -1 ){
          results.push(transaction);
        }
    }
    
    this.transactions = results;
    
    if(results.length == 0 || !key){
      this.transactions = this.getAllTransactions(false);
    }
  }

  private sendNotification(notificationType: NotificationType, message: string): void{
    if(message){
      this.notifier.notify(notificationType, message);
    }else{
      this.notifier.notify(notificationType, "An error occured. please try again");
    }
  }

  ngOnDestroy() : void {
    this.subs.unsubscribe();
  }

}
