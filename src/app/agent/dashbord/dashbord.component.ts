import { Component, OnDestroy, OnInit } from '@angular/core';
import { Transaction } from 'src/app/models/transaction';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { UserService } from 'src/app/services/user.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  public clientsNumber :number = 0;
  public inactiveClientsNumber :number = 0;
  public transcationsNumber :number = 0;
  public agent: User = new User();
  constructor(private authenticationService: AuthenticationService, private userService: UserService,private transactionService : TransactionService) { }

  ngOnInit(): void {
    // this.solde_banque = this.authenticationService.getUserFromLocalCache().agence.banque.solde;
    this.agent = this.authenticationService.getUserFromLocalCache();
    this.getNumberOFClients();
    this.getNumberOfTransactions();
  }

  public getNumberOFClients():void {
    this.subs.add(
      this.userService.getUsers().subscribe(
        (response : User[] | any) => {
          this.userService.addUsersToLacalCache(response);
            for(const client of response) {
              if(!client.active){
                this.inactiveClientsNumber++;
              }
            }
            this.clientsNumber = response.length;
        }
      )
    );
  }

  getNumberOfTransactions():void{
    this.subs.add(
      this.transactionService.getTransactions().subscribe(
        (response : Transaction[] | any) => {    
          this.transcationsNumber = response.length;
        }
      )
    )
  }

  ngOnDestroy() : void {
    this.subs.unsubscribe();
  }

}
