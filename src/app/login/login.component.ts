import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SubSink } from 'subsink';
import { HeaderType } from '../enum/header-type.enum';
import { NotificationType } from '../enum/notification-type.enum';
import { Role } from '../enum/roles.enum';
import { User } from '../models/user';
import { AuthenticationService } from '../services/authentication.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  public  showLoading: boolean = false;

  constructor(private router: Router, private authenticationService: AuthenticationService, private notifier: NotificationService) { }

  ngOnInit(): void {
    if(this.authenticationService.isLoggedIn()){
      if(this.authenticationService.getUserFromLocalCache().roles == "ROLE_CLIENT"){
        this.router.navigateByUrl('/client');
      }
      else if(this.authenticationService.getUserFromLocalCache().roles == "ROLE_AGENT"){
        this.router.navigateByUrl('/agent');
      }
      else{
        this.sendErrorNotification(NotificationType.ERROR, "You don't have the permission");
      }
    }
    else{
      this.router.navigateByUrl('/login');
    }
  }

  onLogin(user:User): void{
    this.showLoading = true;
    this.subs.add(this.authenticationService.login(user).subscribe(
      (response : HttpResponse<User> | any) =>{
          const token = response.headers.get(HeaderType.JWT_TOKEN);
          this.authenticationService.saveToken(token);
          this.authenticationService.addUserToLocalCache(response.body);
          if(this.getUserRole() == Role.ROLE_CLIENT){
            this.router.navigateByUrl('/client');
          }
          else if(this.getUserRole() == Role.ROLE_AGENT){
            this.router.navigateByUrl('/agent');
          }
          else{
            this.sendErrorNotification(NotificationType.ERROR, "You don't have the permission");
          }
          this.showLoading = false;
      },
      (errorResponse: HttpErrorResponse) =>{
        this.sendErrorNotification(NotificationType.ERROR, errorResponse.error.message);
        this.showLoading = false;
      }
      )
    );
  }

  private getUserRole() : string {
    return this.authenticationService.getUserFromLocalCache().roles;
  }

  private sendErrorNotification(notificationType: NotificationType, message: string): void{
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
