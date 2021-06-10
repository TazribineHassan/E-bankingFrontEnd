import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-client-profil',
  templateUrl: './client-profil.component.html',
  styleUrls: ['./client-profil.component.css']
})
export class ClientProfilComponent implements OnInit {
  
  public client: User = new User();
  
  constructor(private authenticationService: AuthenticationService, private userService: UserService) { }

  ngOnInit(): void {
    this.client = this.authenticationService.getUserFromLocalCache();
  }

}
