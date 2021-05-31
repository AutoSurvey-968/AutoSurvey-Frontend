import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IoService {

  endpoint: string = environment.apiUrl+'/io';

  constructor(private http:HttpClient) { }

  sendEmail(
    email: String, 
    message:String, 
    subject: String, 
    ):void{ 

    let parameters: String = 
    '?recipient='+email+'&subject=' + 
    subject+'&message='+ message;
    this.http.post(this.endpoint + parameters, "");
   }
}
