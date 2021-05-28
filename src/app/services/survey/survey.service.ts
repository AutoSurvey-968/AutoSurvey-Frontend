import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ISurvey } from '../../models/isurvey-survey';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  endpoint: string = environment.apiUrl+'/surveys';

  constructor(private http: HttpClient) { }

  getSurveys(): Observable<ISurvey[]> {
    return this.http.get(this.endpoint+'/').pipe(
      map(response => response as ISurvey[])
    );
  }
}
