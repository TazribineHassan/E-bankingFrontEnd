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
  
  constructor(private authenticationService: AuthenticationService, private userService: UserService) { }

  ngOnInit(): void {
    this.client = this.authenticationService.getUserFromLocalCache();
  }

}
