import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashbordComponent } from './dashbord/dashbord.component';
import {AgentComponent} from "./agent.component";
import {RouterModule} from "@angular/router";
import { ClientsComponent } from './clients/clients.component';



@NgModule({
  declarations: [
    DashbordComponent,
    AgentComponent,
    ClientsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class AgentModule { }
