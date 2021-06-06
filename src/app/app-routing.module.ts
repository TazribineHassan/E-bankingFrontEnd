import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgentComponent } from './agent/agent.component';
import { ClientComponent } from './client/client.component';
import { LoginComponent } from './login/login.component';
import {DashbordComponent} from "./agent/dashbord/dashbord.component";
import {ClientsComponent} from "./agent/clients/clients.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'client/home', component: ClientComponent },
  { path: 'agent/home', component: AgentComponent,
  children:[{path:'',component:DashbordComponent},
    {path:'clients',component:ClientsComponent}
  ]},
  { path: '', redirectTo: '/login', pathMatch:'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
