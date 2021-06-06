import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashbordComponent } from './dashbord/dashbord.component';
import {AgentComponent} from "./agent.component";
import {RouterModule} from "@angular/router";
import { ClientsComponent } from './clients/clients.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { AjoutClientsComponent } from './ajout-clients/ajout-clients.component';
import { VerserComponent } from './verser/verser.component';
import {DataTablesModule} from "angular-datatables";



@NgModule({
  declarations: [
    DashbordComponent,
    AgentComponent,
    ClientsComponent,
    TransactionsComponent,
    AjoutClientsComponent,
    VerserComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    DataTablesModule
  ]
})
export class AgentModule { }
