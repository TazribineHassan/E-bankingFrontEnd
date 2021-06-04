import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http'
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { CustomHttpResponse } from '../models/cutom-http-response';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private host: string = environment.apiUrl;
  constructor(private http:HttpClient) { }

  getUsers(): Observable<User[] | HttpErrorResponse>{
    return this.http.get<User[]>(`${this.host}/user/list`);
  }

  addUser(formData: FormData): Observable<User | HttpErrorResponse>{
    return this.http.post<User>(`${this.host}/user/add`, formData);
  }

  updateUser(formData: FormData): Observable<User | HttpErrorResponse>{
    return this.http.post<User>(`${this.host}/user/update`, formData);
  }
 
  restPassword(email: string): Observable<CustomHttpResponse | HttpErrorResponse>{
    return this.http.get<CustomHttpResponse>(`${this.host}/user/resetpassword/${email}`);
  }

  deleteUser(userId:number): Observable<CustomHttpResponse | HttpErrorResponse> {
    return this.http.delete<CustomHttpResponse>(`${this.host}/user/delete/${userId}`);
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

  createUserFormData(loggedInUsername: string, user:User): FormData {
    const formData = new FormData();
    formData.append('currentUsername', loggedInUsername);
    formData.append('cin', user.cin);
    formData.append('nom', user.nom);
    formData.append('prenom', user.prenom);
    formData.append('email', user.email);
    formData.append('roles', user.roles);
    formData.append('iSActive', JSON.stringify(user.active));
    formData.append('isNotLocked', JSON.stringify(user.notLocked));
    return formData;
  }
}
