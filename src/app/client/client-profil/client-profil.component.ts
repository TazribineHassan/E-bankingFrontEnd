import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-client-profil',
  templateUrl: './client-profil.component.html',
  styleUrls: ['./client-profil.component.css']
})
export class ClientProfilComponent implements OnInit {
  
  public client: User = new User();
  public old_password: string = '';
  public new_password_verify: string = '';
  public new_password: string = '';

  constructor(private authenticationService: AuthenticationService, private userService: UserService, private notifier: NotificationService) { }

  ngOnInit(): void {
    this.client = this.authenticationService.getUserFromLocalCache();
  }

  onPasswordResetFormSubmit(form: NgForm){

    //password validation
    if(form.value.new_password !== form.value.new_password_verify){
      this.sendNotification(NotificationType.ERROR, "Le mot de passe et la confirmation ne sont pas identique")
      return;
    }

    if(form.value.new_password.length < 8){
      this.sendNotification(NotificationType.ERROR, "Le nouveau mot de passe doit etre compose de 8 charactere minimum")
      return;
    }


    const passwordResetFormData: FormData = this.userService.createResetPasswordFormData(form.value);
    console.log(passwordResetFormData);
    this.userService.restPassword(passwordResetFormData).subscribe(
      (response : any) => {

        console.log(response);
        form.resetForm();
        this.sendNotification(NotificationType.SUCCESS, "Le mot de passe a ete changer avec succes")
      
      },
      (errorResponse : HttpErrorResponse) => {
        console.log("error teeeeeest " + errorResponse);
        form.resetForm();
        this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
      }
    )
  }

  private sendNotification(notificationType: NotificationType, message: string): void{
    if(message){
      this.notifier.notify(notificationType, message);
    }else{
      this.notifier.notify(notificationType, "An error occured. please try again");
    }
  }


}
