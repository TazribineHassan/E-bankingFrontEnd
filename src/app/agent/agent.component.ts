import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { NotificationType } from '../enum/notification-type.enum';
import { AuthenticationService } from '../services/authentication.service';
import { NotificationService } from '../services/notification.service';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { User } from '../models/user';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css']
})
export class AgentComponent implements OnInit {
  collapse = false;

  private titleSubject = new BehaviorSubject<string>("Tableau de bord");
  public titleAction$ = this.titleSubject.asObservable();
  public userAgent: User = new User();


  constructor(private authenticationService: AuthenticationService, private router : Router, private notifier: NotificationService, private modalService: NgbModal) { }

  public changeTitle(title: string) : void {
    this.titleSubject.next(title);
  }

  ngOnInit(): void {
    if(this.authenticationService.isLoggedIn() && this.authenticationService.getUserFromLocalCache().roles == "ROLE_AGENT"){
      this.userAgent = this.authenticationService.getUserFromLocalCache();
      this.router.navigateByUrl('/agent');
    }
    else{
      this.notifier.notify(NotificationType.ERROR, "You don't have permission")
      this.router.navigateByUrl('/login');
      
    }
  }

  onLogout(){
    this.authenticationService.logout();
    document.getElementById("closeModal")?.click();
    this.router.navigate(['/login']);
    this.notifier.notify(NotificationType.SUCCESS, "You've been successfully logged out")
  }

  toggleSideBar() {
    this.collapse = !this.collapse;
  }
  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }
}
