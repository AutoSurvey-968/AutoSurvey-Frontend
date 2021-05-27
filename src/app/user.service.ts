import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  endpoint: string = environment.apiUrl+'/users';

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    let body = {
      email: email,
      password: password
    };

    return this.http.put(this.endpoint, body).pipe(
      map(response => response as string)
    );
  }
}
