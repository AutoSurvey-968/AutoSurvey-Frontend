import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ISurvey } from './isurvey.survey';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private endpoint: string = environment.apiUrl+'/submissions'

  constructor(private http:  HttpClient) { }

  upload(surveyId: string, body: ISurvey[]) {
    return this.http.put(this.endpoint+'/'+surveyId, body).pipe(

    );
  }
}
