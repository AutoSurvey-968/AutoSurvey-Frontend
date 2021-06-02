import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IoService {

  endpoint: string = environment.apiUrl+'/email';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+localStorage.getItem('token')
    }),
    withCredentials: true
  };

  constructor(private http:HttpClient) { }

  sendEmail(
    email: String, 
    message:String, 
    subject: String, 
    ):Observable<Object>{ 
    let url:string = this.endpoint + "?recipient=" + email + "&subject="+ subject+ "&message=" + message;
    return this.http.post(url, "",this.httpOptions);
   }
}
