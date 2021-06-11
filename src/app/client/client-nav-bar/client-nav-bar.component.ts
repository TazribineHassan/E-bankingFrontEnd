import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NotificationService } from 'src/app/services/notification.service';
import {ClientSideBarComponent} from "../client-side-bar/client-side-bar.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-client-nav-bar',
  templateUrl: './client-nav-bar.component.html',
  styleUrls: ['./client-nav-bar.component.css']
})
export class ClientNavBarComponent implements OnInit {



  constructor(private authenticationService: AuthenticationService, private router: Router,  private notifier:NotificationService,private modalService: NgbModal) { }


  @Output() menuState = new EventEmitter();

  opened: boolean | undefined;
  showMenu = false; /* false by default, since hidden */
  toggleMenu() {
    this.showMenu = !this.showMenu;
    this.menuState.emit(this.showMenu);
  }
  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }
  ngOnInit(): void {
  }

  onLogout(){
    this.authenticationService.logout();
    document.getElementById("closeModal")?.click();
    this.notifier.notify(NotificationType.SUCCESS, "You've been successfully logged out");
    this.router.navigate(['/login']);
  }
}
