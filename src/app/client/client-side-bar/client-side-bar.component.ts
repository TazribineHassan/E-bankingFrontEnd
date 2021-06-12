import {Component, OnInit, Input, OnChanges } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import {ClientNavBarComponent} from "../client-nav-bar/client-nav-bar.component";


@Component({
  selector: 'app-client-side-bar',
  templateUrl: './client-side-bar.component.html',
  styleUrls: ['./client-side-bar.component.css']
})
export class ClientSideBarComponent implements OnInit, OnChanges {
  @Input() subMenuState: boolean | undefined;

  public client: User = new User();
  constructor(private authenticationService: AuthenticationService) { }


  opened: boolean | undefined;
  showMenu: undefined | boolean = false;
  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  ngOnInit() {
    this.client = this.authenticationService.getUserFromLocalCache();
  }

  ngOnChanges(){
   // console.log("inside ngOnChanges with subMenuState: ",this.subMenuState );
    this.showMenu = this.subMenuState;
  }

}
