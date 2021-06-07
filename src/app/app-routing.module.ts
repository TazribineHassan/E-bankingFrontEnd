import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ClientSideBarComponent } from './client-side-bar/client-side-bar.component';
import { ClientNavBarComponent } from './client-nav-bar/client-nav-bar.component';
import { ClientAccuielComponent } from './client-accuiel/client-accuiel.component';
import { ClientProfilComponent } from './client-profil/client-profil.component';
import { ClientVirerComponent } from './client-virer/client-virer.component';
import { ClientHistVirmComponent } from './client-hist-virm/client-hist-virm.component';
import { ClientHistVersComponent } from './client-hist-vers/client-hist-vers.component';
import { ClientHistFactComponent } from './client-hist-fact/client-hist-fact.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/app', pathMatch:'full'},
  { path: '', component: ClientSideBarComponent},
  { path: '', component: ClientNavBarComponent},
  { path: 'accueil', component: ClientAccuielComponent, },
  { path: 'profil', component: ClientProfilComponent},
  { path: 'virer', component: ClientVirerComponent},
  { path: 'virements', component: ClientHistVirmComponent},
  { path: 'versements', component: ClientHistVersComponent},
  { path: 'Listfacturation', component: ClientHistFactComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
