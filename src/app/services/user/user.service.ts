import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  endpoint: string = environment.apiUrl+'/';
  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), withCredentials:true};

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<string> {  
    let body = {
      "email": email,
      "password": password
    };

    return this.http.put(this.endpoint, body,this.httpOptions).pipe(
      map(response => response as string)
    );
  }
}