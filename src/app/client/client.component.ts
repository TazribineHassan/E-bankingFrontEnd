import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { NotificationType } from '../enum/notification-type.enum';
import { AuthenticationService } from '../services/authentication.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  
  private titleSubject = new BehaviorSubject<string>("Home");
  public titleAction$ = this.titleSubject.asObservable();


  constructor(private authenticationService: AuthenticationService, private router : Router, private notifier: NotificationService) { }


  public changeTitle(title: string) : void {
    this.titleSubject.next(title);
  }
 
  ngOnInit(): void { 
    if(this.authenticationService.isLoggedIn() && this.authenticationService.getUserFromLocalCache().roles == "ROLE_CLIENT"){
      this.router.navigateByUrl('/client');
    }
    else{
      this.notifier.notify(NotificationType.ERROR, "You don't have permission")
      this.router.navigateByUrl('/login');
    }
  }

  subMenuState:boolean = false;
  burgerClicked(event: boolean){
    this.subMenuState = event;
    //console.log("inside burgerClicked: pls. change showMenu to be:",this.subMenuState);
  }
  
}
