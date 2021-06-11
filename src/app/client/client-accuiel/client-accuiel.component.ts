import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
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
  
  constructor(private authenticationService: AuthenticationService, private userService: UserService) { }

  ngOnInit(): void {
    this.client = this.authenticationService.getUserFromLocalCache();
    this.client.transactions.forEach(element => {

      if(element.type_transaction === "payement") this.num_factures++;
      if(element.type_transaction === "virement") this.num_virement++;
      if(element.type_transaction === "versement") this.num_versement++;
      
    });
  }

}
