import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { Transaction } from 'src/app/models/transaction';
import { ClientTransactionsService } from 'src/app/services/client-transactions.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-client-virer',
  templateUrl: './client-virer.component.html',
  styleUrls: ['./client-virer.component.css']
})
export class ClientVirerComponent implements OnInit, OnDestroy {

  
  public static nombreTransaction: number = 0;
  public code_verefication : number = 0;
  private subscriptions : Subscription[] = [];
  constructor(private clientTansactionsService : ClientTransactionsService, 
              private notifier: NotificationService,
              private modalService: NgbModal) { }

  onSaveNewVirement(transaction: NgForm) :void{

    const formData = this.clientTansactionsService.createVirementFormData(transaction.value);

    this.subscriptions.push(
      this.clientTansactionsService.makeVirement(formData).subscribe(
        (response : any) => {

          console.log(response);
          // click the modal button
          document.getElementById("codeVerificationModalButton")?.click();
          transaction.resetForm();
          this.sendNotification(NotificationType.SUCCESS, "Un code de verefication a ete envoyee a votre email")
          document.getElementById("closeModal")?.click();
        },
        (errorResponse : HttpErrorResponse) => {
          console.log("error teeeeeest " + errorResponse);
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
          document.getElementById("closeModal")?.click();
        }
      )
    )
  }
  
  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  ngOnInit(): void {
    
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

  validerClicked(){
    this.subscriptions.push(
      this.clientTansactionsService.confirmeVirement(this.code_verefication).subscribe(
        (response : Transaction | any) => {

          console.log(response);
          // close the code validation button
          document.getElementById("codeVerificationModalClose")?.click();
          this.code_verefication =0;
          this.sendNotification(NotificationType.SUCCESS, "Le virement s'est bien passée")
          //close the loading modal
          document.getElementById("closeModal")?.click();
        },
        (errorResponse : HttpErrorResponse) => {
          // close the code validation button
          document.getElementById("codeVerificationModalClose")?.click();
          //close the loading modal
          document.getElementById("closeModal")?.click();
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
        }
      )
    )
  }

}
