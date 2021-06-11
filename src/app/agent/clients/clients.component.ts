import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { User } from 'src/app/models/user';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';
import { NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { CustomHttpResponse } from 'src/app/models/cutom-http-response';
import { SubSink } from 'subsink';


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  public client : User = new User();
  public userId: number | any;
  public editedUser : User = new User();
  public users: User[] | any;
  modalContent: any;
  constructor(private userService : UserService, private notifier: NotificationService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getClients(true);
  }

  public getClients(showNotification: boolean):void {
    this.subs.add(
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
    this.subs.add(
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
    this.subs.add(
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

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  ngOnDestroy() : void {
    this.subs.unsubscribe();
  }

  searchClient(key : string) : void {
    const results : User[] = [];
    //let clients = this.userService.getUsersFromLocalCache();
    for (const client of this.users) {
      if(client.nom.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||  client.prenom.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        client.cin.toLowerCase().indexOf(key.toLowerCase()) !== -1  || client.compte.numCompte.toLowerCase().indexOf(key.toLowerCase()) !== -1 ){
          results.push(client);
        }
    }
    
    this.users = results;
    
    if(results.length == 0 || !key){
      this.users = this.userService.getUsersFromLocalCache();
    }
  }

  private sendNotification(notificationType: NotificationType, message: string): void{
    if(message){
      this.notifier.notify(notificationType, message);
    }else{
      this.notifier.notify(notificationType, "An error occured. please try again");
    }
  }
}
