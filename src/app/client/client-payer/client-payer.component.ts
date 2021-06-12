import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { Facture } from 'src/app/models/facture';
import { ClientTransactionsService } from 'src/app/services/client-transactions.service';
import { NotificationService } from 'src/app/services/notification.service';
import { SubSink } from 'subsink';


@Component({
  selector: 'app-client-payer',
  templateUrl: './client-payer.component.html',
  styleUrls: ['./client-payer.component.css']
})
export class ClientPayerComponent implements OnDestroy{
  
  
  public static nombreTransaction: number = 0;
  public code_verefication : number = 0;
  private subs = new SubSink();
  public facture: Facture = new Facture();

  constructor(private clientTansactionsService : ClientTransactionsService, 
              private notifier: NotificationService, 
              private modalService: NgbModal) { }

  onSaveNewVirement(transaction: NgForm) :void{
    const formData = this.clientTansactionsService.createPayementFormData(transaction.value);
  }
  
  ngOnInit(): void {
    
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

  ChercherClicked(facture_form: any){
    this.facture.code = facture_form.facture_code + "";

    this.subs.add(
      this.clientTansactionsService.searchPayment(this.facture.code).subscribe(
        (response : number | any) => {

          //close loading modale
          document.getElementById("closeModal")?.click();
          console.log(response);
          this.facture.montant = response;
          console.log(this.facture);
        },
        (errorResponse : HttpErrorResponse) => {

          //close the loading modal
          document.getElementById("closeModal")?.click();
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
        }
      )
    )

  }

  validerClicked(){

    const facture_fom_data = this.clientTansactionsService.createPayementFormData(this.facture);

    this.subs.add(
      this.clientTansactionsService.makePayement(facture_fom_data).subscribe(
        (response : any) => {

          console.log(response);
          this.facture.code = '';
          this.facture.montant = 0;
          // click the modal button
          document.getElementById("codeVerificationModalButton")?.click();
          //close loading modal
          document.getElementById("closeModal")?.click();
          this.sendNotification(NotificationType.SUCCESS, "Un code de verefication a ete envoyee a votre email")
        
        },
        (errorResponse : HttpErrorResponse) => {
          // click the modal button
          document.getElementById("codeVerificationModalButton")?.click();
          console.log("error teeeeeest " + errorResponse);
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
          //close loading modal
          document.getElementById("closeModal")?.click();
        }
      )
    )
  }


  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  validerCodeClicked(){
    this.subs.add(
      this.clientTansactionsService.confirmePayement(this.code_verefication + "").subscribe(
        (response : string | any) => {

          console.log(response);
          // close the modal button
          document.getElementById("codeVerificationModalClose")?.click();
          //close loading modal
          document.getElementById("closeModal")?.click();
          this.code_verefication =0;
          this.sendNotification(NotificationType.SUCCESS, "La facture s'est bien payée")
        
        },
        (errorResponse : HttpErrorResponse) => {
          // close the modal button
          document.getElementById("codeVerificationModalClose")?.click();
          //close loading modal
          document.getElementById("closeModal")?.click();
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
        }
      )
    )
  }

}