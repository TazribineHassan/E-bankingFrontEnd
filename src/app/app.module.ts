import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { AuthenticationGuard } from './guard/authentication.guard';
import { NotificationModule } from './notification.module';
import { NotificationService } from './services/notification.service';
import { LoginComponent } from './login/login.component';
import { ClientSideBarComponent } from './client-side-bar/client-side-bar.component';
import { ClientNavBarComponent } from './client-nav-bar/client-nav-bar.component';
import { ClientAccuielComponent } from './client-accuiel/client-accuiel.component';
import { ClientProfilComponent } from './client-profil/client-profil.component';
import { ClientVirerComponent } from './client-virer/client-virer.component';
import { ClientHistVirmComponent } from './client-hist-virm/client-hist-virm.component';
import { ClientHistVersComponent } from './client-hist-vers/client-hist-vers.component';
import { ClientHistFactComponent } from './client-hist-fact/client-hist-fact.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ClientSideBarComponent,
    ClientNavBarComponent,
    ClientAccuielComponent,
    ClientProfilComponent,
    ClientVirerComponent,
    ClientHistVirmComponent,
    ClientHistVersComponent,
    ClientHistFactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NotificationModule
  ],
  providers: [NotificationService, AuthenticationGuard ,AuthenticationService, UserService, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
