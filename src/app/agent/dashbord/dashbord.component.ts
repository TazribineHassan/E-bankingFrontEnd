import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Transaction } from 'src/app/models/transaction';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {

  public clientsNumber :number = 0;
  public transcationsNumber :number = 0;
  public agent: User = new User();
  private subscriptions : Subscription[] = [];
  constructor(private authenticationService: AuthenticationService, private userService: UserService,private transactionService : TransactionService) { }

  ngOnInit(): void {
    // this.solde_banque = this.authenticationService.getUserFromLocalCache().agence.banque.solde;
    this.agent = this.authenticationService.getUserFromLocalCache();
    this.getNumberOFClients();
    this.getNumberOfTransactions();
  }

  public getNumberOFClients():void {
    this.subscriptions.push(
      this.userService.getUsers().subscribe(
        (response : User[] | any) => {
          this.userService.addUsersToLacalCache(response);
            this.clientsNumber = response.length;
        }
      )
    );
  }

  getNumberOfTransactions():void{
    this.subscriptions.push(
      this.transactionService.getTransactions().subscribe(
        (response : Transaction[] | any) => {    
          this.transcationsNumber = response.length;
        }
      )
    )
  }

}
