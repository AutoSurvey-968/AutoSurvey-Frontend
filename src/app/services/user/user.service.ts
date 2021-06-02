import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { EMPTY, from, Observable } from 'rxjs';
import { IUser } from '../../models/iuser-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  endpoint: string = environment.apiUrl+'/users';
  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), withCredentials:true};

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<IUser> {
    let body = {
      "email": email,
      "password": password
    };
    return this.http.put(this.endpoint, body, this.httpOptions).pipe(
      map(response => {
        return response as IUser;
      })
    );
  }

  register(firstName: string, lastName: string, email: string): Observable<string> {
    if (localStorage.getItem("token") === null) {
      return EMPTY;
    }
    this.httpOptions.headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization' : 'Bearer ' + localStorage.getItem('token')});
    let body = {
      "firstName" : firstName,
      "lastName" : lastName,
      "email" : email,
    };
    return this.http.post(this.endpoint, body, this.httpOptions).pipe(
      map(response => {
        return response as string;
      })
    );
  }
}
