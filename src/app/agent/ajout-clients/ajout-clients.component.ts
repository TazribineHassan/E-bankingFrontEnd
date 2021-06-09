import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-ajout-clients',
  templateUrl: './ajout-clients.component.html',
  styleUrls: ['./ajout-clients.component.css']
})
export class AjoutClientsComponent implements OnInit {
  optionValue: any;
  public agenceId: number = 0;
  private subscriptions : Subscription[] = [];
  constructor(private userService: UserService, private notifier : NotificationService, private authenticationService: AuthenticationService) { }

  onSaveNewClient(client : NgForm) : void{
    const formData = this.userService.createUserFormData(null, client.value)
    this.subscriptions.push(
    this.userService.addUser(formData).subscribe(
      (response : User | any) => {
        client.resetForm();
        this.sendNotification(NotificationType.SUCCESS, "Un nouveau client a été ajouté avec succès,un email a été envoyé au client");
      },
      (errorResponse : HttpErrorResponse) => {
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
}
