import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ISurvey } from '../../models/isurvey-survey';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  endpoint: string = environment.apiUrl+'/surveys';

  constructor(private http: HttpClient) { }

  getSurveys(): Observable<ISurvey[]> {
    let surveys: ISurvey[] = [];

    return this.http.get<ISurvey[]>(this.endpoint);
  }
}
