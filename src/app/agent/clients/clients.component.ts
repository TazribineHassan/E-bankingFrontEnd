import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { User } from 'src/app/models/user';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';
import { NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { CustomHttpResponse } from 'src/app/models/cutom-http-response';


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  public client : User = new User();
  public userId: number | any;
  public editedUser : User = new User();
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

  public passUser(id : number | any) : void{
    this.userId = id;
  }

  public blockUserAccount() : void{
    this.subscriptions.push(
      this.userService.blockUserAccount(this.userId).subscribe(
        (response : CustomHttpResponse | any) =>{
          this.sendNotification(NotificationType.SUCCESS, response.message);
          this.getClients(false);
          document.getElementById('closeModal')?.click();
        },
        (errorResponse : HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
        }
      )
    )
  }

  public editUser(user : User) : void{
    this.editedUser = user;
  
  }

  onUpdateUser(): void {
    const formData = this.userService.createUserFormData(null, this.editedUser)
    this.subscriptions.push(
    this.userService.updateUser(formData).subscribe(
      (response : User | any) => {
        console.log(this.editedUser);
        this.sendNotification(NotificationType.SUCCESS, "Client a été modifié avec succès");
        document.getElementById("editColse")?.click();
        this.getClients(false);
      },
      (errorResponse : HttpErrorResponse) => {
        this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
      }
    ))  
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
