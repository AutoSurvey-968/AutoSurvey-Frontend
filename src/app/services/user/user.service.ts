import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  endpoint: string = environment.apiUrl+'/users';
<<<<<<< HEAD
  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), withCredentials:true};
=======
  //private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), withCredentials:true};
  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), withCredentials: true };
>>>>>>> d752dc3b5da94036fd58e57dc8afcef34a25d3c3

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<string> {
    let body = {
      "email": email,
      "password": password
    };

    return this.http.put(this.endpoint, JSON.stringify(body), this.httpOptions).pipe(
      map(response => response as string)
    );
  }
}
