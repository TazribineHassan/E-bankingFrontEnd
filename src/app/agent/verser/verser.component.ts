import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { Transaction } from 'src/app/models/transaction';
import { NotificationService } from 'src/app/services/notification.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-verser',
  templateUrl: './verser.component.html',
  styleUrls: ['./verser.component.css']
})
export class VerserComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  
  constructor(private transactionService: TransactionService, private notifier : NotificationService, private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  onSaveNewTransaction(transaction: NgForm) :void{
    const formData = this.transactionService.createUserFormData(transaction.value);
    console.log(transaction.value);
    this.subs.add(
      this.transactionService.makeTransaction(formData).subscribe(
        (response : Transaction | any) => {
          transaction.resetForm();
          this.sendNotification(NotificationType.SUCCESS, "La transaction s'est bien passée")
          document.getElementById("closeModal")?.click();
        },
        (errorResponse : HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
          document.getElementById("closeModal")?.click();
        }
      )
    )
  }
  
  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
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
