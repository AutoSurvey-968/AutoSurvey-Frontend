import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ISurvey } from '../../models/isurvey-survey';


interface SurveyServiceInterface {
  getSurveys(): Observable<Map<string, ISurvey>>;
}

@Injectable({
  providedIn: 'root'
})
export class SurveyService implements SurveyServiceInterface {
  endpoint: string = environment.apiUrl+'/surveys';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+localStorage.getItem('token')
    }),
    withCredentials: true
  };

  constructor(private http: HttpClient) { }

  getSurveys(): Observable<Map<string, ISurvey>> {
    return this.http.get<any>(this.endpoint+'/', this.httpOptions).pipe(
      map(response => response as Map<string, ISurvey> )
    );
  }

  addSurvey(survey: ISurvey):Observable<ISurvey> {
    return this.http.post<ISurvey>(this.endpoint, survey, this.httpOptions);
  }

  getSurveyById(surveyId: string): Observable<ISurvey> {
    return this.http.get<ISurvey>(this.endpoint + "/" + surveyId);
  }

}

@Injectable({
  providedIn: 'root'
})
export class MockSurveyService implements SurveyServiceInterface {
  constructor() {}
  getSurveys(): Observable<Map<string, ISurvey>> {
    let survey0: ISurvey = {
      uuid: "000",
      createdOn: "now",
      title: "title0",
      description: "",
      confirmation: "",
      version: "",
      questions: [],
    }
    let survey1: ISurvey = {
      uuid: "001",
      createdOn: "now",
      title: "title1",
      description: "",
      confirmation: "",
      version: "",
      questions: [],
    }
    let response: Map<string, ISurvey> = new Map();
    response.set(survey0.uuid, survey0);
    response.set(survey1.uuid, survey1);
    return of(response);
  }

}
