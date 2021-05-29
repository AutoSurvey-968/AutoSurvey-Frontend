import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ISurvey } from '../../models/isurvey-survey';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private endpoint: string = environment.apiUrl+'/submissions'

  constructor(private http:  HttpClient) { }

  upload(surveyId: string, body: Map<string, ISurvey>): Observable<string> {
    return this.http.put(this.endpoint+'/'+surveyId, body).pipe(
      map(response => response as string)
    );
  }
}
