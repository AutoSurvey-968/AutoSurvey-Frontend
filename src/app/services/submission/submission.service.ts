import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISubmission } from 'src/app/models/isubmission-submission';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {
  private endpoint: string = environment.apiUrl+'/submissions'
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+localStorage.getItem('token')
    }),
    withCredentials: true
  };

  constructor(private http: HttpClient) { }

  submit(body: ISubmission) {
    return this.http.put(this.endpoint+'/', body, this.httpOptions).pipe();
  }
}
