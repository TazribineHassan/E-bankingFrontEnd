import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-ajout-clients',
  templateUrl: './ajout-clients.component.html',
  styleUrls: ['./ajout-clients.component.css']
})
export class AjoutClientsComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  optionValue: any;
  public agenceId: number = 0;
  constructor(private userService: UserService, private notifier : NotificationService, private authenticationService: AuthenticationService,  private modalService: NgbModal) { }

  onSaveNewClient(client : NgForm) : void{
    const formData = this.userService.createUserFormData(null, client.value)
    this.subs.add(
    this.userService.addUser(formData).subscribe(
      (response : User | any) => {
        client.resetForm();
        this.sendNotification(NotificationType.SUCCESS, "Un nouveau client a été ajouté avec succès,un email a été envoyé au client");
        document.getElementById("closeModal")?.click();
      },
      (errorResponse : HttpErrorResponse) => {
        document.getElementById("closeModal")?.click();
        this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
      }
    ))
  }

  ngOnInit(): void {
    this.agenceId = this.authenticationService.getUserFromLocalCache().agence.id;
  }

  private sendNotification(notificationType: NotificationType, message: string): void{
    if(message){
      this.notifier.notify(notificationType, message);
    }else{
      this.notifier.notify(notificationType, "An error occured. please try again");
    }
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  ngOnDestroy() : void {
    this.subs.unsubscribe();
  }
}
