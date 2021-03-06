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
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { ProfilComponent } from './profil/profil.component';



@NgModule({
  declarations: [
    DashbordComponent,
    AgentComponent,
    ClientsComponent,
    TransactionsComponent,
    AjoutClientsComponent,
    VerserComponent,
    ProfilComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    DataTablesModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule
  ]
})
export class AgentModule { }
