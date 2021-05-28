import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISubmission } from 'src/app/models/isubmission-submission';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {
  private endpoint: string = environment.apiUrl+'/submissions'

  constructor(private http:  HttpClient) { }

  submit(body: ISubmission) {
    return this.http.put(this.endpoint+'/', body).pipe();
  }
}
