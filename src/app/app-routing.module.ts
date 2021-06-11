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
import {ProfilComponent} from "./agent/profil/profil.component";

import { ClientAccuielComponent } from './client/client-accuiel/client-accuiel.component';
import { ClientProfilComponent } from './client/client-profil/client-profil.component';
import { ClientVirerComponent } from './client/client-virer/client-virer.component';
import { ClientHistVirmComponent } from './client/client-hist-virm/client-hist-virm.component';
import { ClientHistVersComponent } from './client/client-hist-vers/client-hist-vers.component';
import { ClientHistFactComponent } from './client/client-hist-fact/client-hist-fact.component';
import { ClientPayerComponent } from './client/client-payer/client-payer.component';

const routes: Routes = [
  { path: 'login', 
    component: LoginComponent
  },
  { path: 'client', component: ClientComponent,
    children: [
      { path: '', component: ClientAccuielComponent},
      { path: 'accueil', component: ClientAccuielComponent, },
      { path: 'profil', component: ClientProfilComponent},
      { path: 'virer', component: ClientVirerComponent},
      { path: 'payer', component: ClientPayerComponent},
      { path: 'virements', component: ClientHistVirmComponent},
      { path: 'versements', component: ClientHistVersComponent},
      { path: 'Listfacturation', component: ClientHistFactComponent}
    ] 
  },
  { path: 'agent', component: AgentComponent,
    children: [{ path: '', component: DashbordComponent },
    { path: 'clients', component: ClientsComponent },
    { path: 'transactions', component: TransactionsComponent },
    { path: 'add-client', component: AjoutClientsComponent },
    { path: 'verse', component: VerserComponent },
    { path: 'profil', component: ProfilComponent }
    ]},
  { path: '', redirectTo: '/login', pathMatch:'full' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
