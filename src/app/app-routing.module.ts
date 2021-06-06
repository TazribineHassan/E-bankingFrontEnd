import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgentComponent } from './agent/agent.component';
import { ClientComponent } from './client/client.component';
import { LoginComponent } from './login/login.component';
import {DashbordComponent} from "./agent/dashbord/dashbord.component";
import {ClientsComponent} from "./agent/clients/clients.component";
import {AjoutClientsComponent} from "./agent/ajout-clients/ajout-clients.component";
import {VerserComponent} from "./agent/verser/verser.component";
import {TransactionsComponent} from "./agent/transactions/transactions.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'client/home', component: ClientComponent },
  { path: 'agent/home', component: AgentComponent,
  children:[{path:'',component:DashbordComponent},
    {path:'clients',component:ClientsComponent},
    {path:'transactions',component:TransactionsComponent},
    {path:'add-client',component:AjoutClientsComponent},
    {path:'verse',component:VerserComponent}
  ]},
  { path: '', redirectTo: '/login', pathMatch:'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }