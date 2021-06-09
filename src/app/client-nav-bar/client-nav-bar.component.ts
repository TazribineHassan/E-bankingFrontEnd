import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {ClientSideBarComponent} from "../client-side-bar/client-side-bar.component";

@Component({
  selector: 'app-client-nav-bar',
  templateUrl: './client-nav-bar.component.html',
  styleUrls: ['./client-nav-bar.component.css']
})
export class ClientNavBarComponent implements OnInit {


  constructor() { }


  @Output() menuState = new EventEmitter();

  opened: boolean | undefined;
  showMenu = false; /* false by default, since hidden */
  toggleMenu() {
    //onsole.log("inside toggleMenu");
    this.showMenu = !this.showMenu;
    this.menuState.emit(this.showMenu);
  }
  ngOnInit(): void {
  }
}
