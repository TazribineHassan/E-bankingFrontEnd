import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'E-bankingFrontAngular';
  subMenuState:boolean = false;
  burgerClicked(event: boolean){
    this.subMenuState = event;
    //console.log("inside burgerClicked: pls. change showMenu to be:",this.subMenuState);
  }
}
