import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ISurvey } from '../../models/isurvey-survey';

interface SurveyServiceInterface {
  getSurveys(): Observable<ISurvey[]>
}

@Injectable({
  providedIn: 'root'
})
export class SurveyService implements SurveyServiceInterface {
  endpoint: string = environment.apiUrl+'/surveys';
  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  constructor(private http: HttpClient) { }

  getSurveys(): Observable<ISurvey[]> {
    return this.http.get(this.endpoint+'/', this.httpOptions).pipe(
      map(response => response as ISurvey[])
    );
  }
}

@Injectable({
  providedIn: 'root'
})
export class MockSurveyService implements SurveyServiceInterface {
  constructor() {}

  getSurveys(): Observable<ISurvey[]> {
    return of([
      {
      uuid: "000",
      createdOn: "now",
      title: "title",
      description: "",
      confirmation: "",
      version: "",
      questions: [],
      },
      {
        uuid: "001",
        createdOn: "now",
        title: "title 2",
        description: "",
        confirmation: "",
        version: "",
        questions: [],
      }
    ]);
  }
}
