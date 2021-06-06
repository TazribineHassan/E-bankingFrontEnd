import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HeaderType } from '../enum/header-type.enum';
import { NotificationType } from '../enum/notification-type.enum';
import { User } from '../models/user';
import { AuthenticationService } from '../services/authentication.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  public  showLoading: boolean = false;
  private subscriptions : Subscription[] = [];

  constructor(private router: Router, private authenticationService: AuthenticationService, private notifier: NotificationService) { }

  ngOnInit(): void {
    if(this.authenticationService.isLoggedIn()){
      this.router.navigateByUrl('/user/home');
    }
    else{
      this.router.navigateByUrl('/login');
    }
  }

  onLogin(user:User): void{
    this.showLoading = true;
    this.subscriptions.push(this.authenticationService.login(user).subscribe(
      (response : HttpResponse<User> | any) =>{
          const token = response.headers.get(HeaderType.JWT_TOKEN);
          this.authenticationService.saveToken(token);
          this.authenticationService.addUserToLocalCache(response.body);
          this.router.navigateByUrl('/client/home');
          this.showLoading = false;
      },
      (errorResponse: HttpErrorResponse) =>{
        this.sendErrorNotification(NotificationType.ERROR, errorResponse.error.message);
        this.showLoading = false;
      }
      )
    );
  }

  private sendErrorNotification(notificationType: NotificationType, message: string): void{
    if(message){
      this.notifier.notify(notificationType, message);
    }else{
      this.notifier.notify(notificationType, "An error occured. please try again");
    }
  }

  ngOnDestroy() : void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }


}
