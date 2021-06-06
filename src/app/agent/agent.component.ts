import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationType } from '../enum/notification-type.enum';
import { AuthenticationService } from '../services/authentication.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css']
})
export class AgentComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private router : Router, private notifier: NotificationService) { }

  ngOnInit(): void {
    if(this.authenticationService.isLoggedIn() && this.authenticationService.getUserFromLocalCache().roles == "ROLE_ADMIN"){
      this.router.navigateByUrl('/agent/home');
    }
    else{
      this.notifier.notify(NotificationType.ERROR, "You don't have permission")
      this.router.navigateByUrl('/login');
    }
  }

}
