import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISubmission } from 'src/app/models/isubmission-submission';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {
  private endpoint: string = environment.apiUrl+'/responses'
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+localStorage.getItem('token')
    }),
    withCredentials: true
  };

  constructor(private http: HttpClient) { }

  submit(body: ISubmission) {
    let jsonBody = JSON.stringify(body);
    console.log(body);
    jsonBody = jsonBody.substring(0, jsonBody.length-2);

    for (let response of body.responses) {
      jsonBody = jsonBody+ '"' +response[0]+ '"' + ': ' + '"'+response[1]+'",';
    }
    jsonBody = jsonBody.substring(0, jsonBody.length-1);
    jsonBody = jsonBody + '}}';
    console.log(jsonBody);
    return this.http.post(this.endpoint+'/', jsonBody, this.httpOptions).pipe();
  }
}
