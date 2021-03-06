import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { NotificationModule } from './notification.module';
import { NotificationService } from './services/notification.service';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClientComponent } from './client/client.component';
import { AuthenticationGuard } from './guard/authentication.guard';
import {AgentModule} from "./agent/agent.module";
import { ClientSideBarComponent } from './client/client-side-bar/client-side-bar.component';
import { ClientNavBarComponent } from './client/client-nav-bar/client-nav-bar.component';
import { ClientAccuielComponent } from './client/client-accuiel/client-accuiel.component';
import { ClientProfilComponent } from './client/client-profil/client-profil.component';
import { ClientVirerComponent } from './client/client-virer/client-virer.component';
import { ClientHistVirmComponent } from './client/client-hist-virm/client-hist-virm.component';
import { ClientHistVersComponent } from './client/client-hist-vers/client-hist-vers.component';
import { ClientHistFactComponent } from './client/client-hist-fact/client-hist-fact.component';
import { ClientPayerComponent } from './client/client-payer/client-payer.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ClientComponent,
    ClientSideBarComponent,
    ClientNavBarComponent,
    ClientAccuielComponent,
    ClientProfilComponent,
    ClientVirerComponent,
    ClientHistVirmComponent,
    ClientHistVersComponent,
    ClientHistFactComponent,
    ClientPayerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NotificationModule,
    FormsModule,
    BrowserAnimationsModule,
    AgentModule,
    NgbModule,
  ],
  providers: [AuthenticationGuard, NotificationService, AuthenticationService, UserService, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true}],
  bootstrap: [AppComponent],
})
export class AppModule { }
