import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { User } from 'src/app/models/user';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';
import { NgbModal} from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  public users: User[] = [];
  private subscriptions : Subscription[] = [];
  modalContent: any;
  constructor(private userService : UserService, private notifier: NotificationService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getClients(true);
  }

  public getClients(showNotification: boolean):void {
    this.subscriptions.push(
      this.userService.getUsers().subscribe(
        (response : User[] | any) => {
          this.userService.addUsersToLacalCache(response);
          console.log(response);
          this.users = response;
          if(showNotification){
            this.sendNotification(NotificationType.SUCCESS, `${response.length} clients loaded successfuly.`);
          }
        },
        (errorResponse : HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
        }
      )
    );
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
}
