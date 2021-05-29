import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IoService {

  endpoint: string = environment.apiUrl+'/io';

  constructor(private http:HttpClient) { }

  sendEmail():void{ 
    return this.http.post();
  }
}
