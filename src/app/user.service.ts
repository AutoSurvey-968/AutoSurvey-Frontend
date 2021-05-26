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
      return this.http.put(this.endpoint, {email, password}).pipe(
      map(response => response as string)
    );
  }
}
