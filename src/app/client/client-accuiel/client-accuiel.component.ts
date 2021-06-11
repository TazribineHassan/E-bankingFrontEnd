import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-client-accuiel',
  templateUrl: './client-accuiel.component.html',
  styleUrls: ['./client-accuiel.component.css']
})
export class ClientAccuielComponent implements OnInit {

  public client: User = new User();
  public num_factures: number = 0;
  public num_virement: number = 0;
  public num_versement: number = 0;
  
  constructor(private authenticationService: AuthenticationService, private userService: UserService, private notifier: NotificationService) { }

  ngOnInit(): void {
    this.authenticationService.getCurrentUser().subscribe(
        (response: User | any ) => {

          this.client = response;
          this.client.transactions.forEach(element => {

            if(element.type_transaction === "payement") this.num_factures++;
            if(element.type_transaction === "virement") this.num_virement++;
            if(element.type_transaction === "versement") this.num_versement++;
            
          });
        },
        (errorResponse: HttpErrorResponse | any) =>{
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
        }
    );
  }

  private sendNotification(notificationType: NotificationType, message: string): void{
    if(message){
      this.notifier.notify(notificationType, message);
    }else{
      this.notifier.notify(notificationType, "An error occured. please try again");
    }
  }


}
