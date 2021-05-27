import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ISurvey } from '../../models/isurvey-survey';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  endpoint: string = environment.apiUrl+'/surveys';

  constructor(private http: HttpClient) { }

  getSurveys(): ISurvey[] {
    let surveys: ISurvey[] = [];

    // this.http.get(this.endpoint).pipe(
    //   map(response => response as string)
    // );
    return surveys;
  }
}
