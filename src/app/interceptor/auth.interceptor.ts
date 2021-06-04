import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authentificationService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, handler: HttpHandler): Observable<HttpEvent<any>> {
    if(request.url.includes(`${this.authentificationService.host}/user/login`)){
      return handler.handle(request);
    }
    this.authentificationService.loadToken();
    const token = this.authentificationService.getToken();
    const clonedRequest = request.clone({setHeaders:{Authorization: `Bearer ${token}`}});
    return handler.handle(clonedRequest); 
  }
}
