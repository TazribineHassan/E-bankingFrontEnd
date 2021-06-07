import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { NotificationType } from '../enum/notification-type.enum';
import { AuthenticationService } from '../services/authentication.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css']
})
export class AgentComponent implements OnInit {

  private titleSubject = new BehaviorSubject<string>("Tableau de bord");
  public titleAction$ = this.titleSubject.asObservable();
  public agentNom: string = "";
  public agentPrenom: string = "";
  public agentCode: string = "";
  public agenceNom: string = "";

  constructor(private authenticationService: AuthenticationService, private router : Router, private notifier: NotificationService) { }

  public changeTitle(title: string) : void {
    this.titleSubject.next(title);
  }

  ngOnInit(): void {
    if(this.authenticationService.isLoggedIn() && this.authenticationService.getUserFromLocalCache().roles == "ROLE_AGENT"){
      this.agentNom =  this.authenticationService.getUserFromLocalCache().nom;
      this.agentPrenom =  this.authenticationService.getUserFromLocalCache().prenom;
      this.agentCode =  this.authenticationService.getUserFromLocalCache().code_agent;
      this.agenceNom =  this.authenticationService.getUserFromLocalCache().agence.nom;
      this.router.navigateByUrl('/agent/home');
    }
    else{
      this.notifier.notify(NotificationType.ERROR, "You don't have permission")
      this.router.navigateByUrl('/login');
    }
  }

}
