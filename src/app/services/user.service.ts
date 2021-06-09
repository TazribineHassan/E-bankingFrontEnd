import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http'
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { CustomHttpResponse } from '../models/cutom-http-response';
import { AuthenticationService } from './authentication.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private host: string = environment.apiUrl;
  constructor(private http:HttpClient, private authenticationService : AuthenticationService) { }

  getUsers(): Observable<User[] | HttpErrorResponse>{
    return this.http.get<User[]>(`${this.host}/agent/client/all`);
  }

  addUser(formData: FormData): Observable<User | HttpErrorResponse>{
    return this.http.post<User>(`${this.host}/agent/client/add`, formData);
  }

  updateUser(formData: FormData): Observable<User | HttpErrorResponse>{
    return this.http.put<User>(`${this.host}/agent/client/update`, formData);
  }
 
  restPassword(email: string): Observable<CustomHttpResponse | HttpErrorResponse>{
    return this.http.get<CustomHttpResponse>(`${this.host}/user/resetpassword/${email}`);
  }

  blockUserAccount(userId:number): Observable<CustomHttpResponse | HttpErrorResponse> {
    return this.http.put<CustomHttpResponse>(`${this.host}/agent/client/terminate/${userId}`, null);
  }

  addUsersToLacalCache(users:User[]):void{
    localStorage.setItem('users', JSON.stringify(users));
  }

  getUsersFromLocalCache(): User[] | null{
    if (localStorage.getItem('users')){
      return JSON.parse(localStorage['users']);
    }
    return null;
  }

  createUserFormData(loggedInUsername: string | any, user:User): FormData {
    const formData = new FormData();
    formData.append('username', user.username);
    formData.append('cin', user.cin);
    formData.append('nom', user.nom);
    formData.append('prenom', user.prenom);
    formData.append('email', user.email);
    formData.append('num_tele', user.num_tele);
    formData.append('date_naissance', user.date_naissance + "");
    formData.append('isActive', user.active + "");
    formData.append('id_agence', JSON.stringify(this.authenticationService.getUserFromLocalCache().agence.id));
    return formData;
  }
}
