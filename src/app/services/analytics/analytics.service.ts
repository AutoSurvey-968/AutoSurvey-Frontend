import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IReport } from 'src/app/models/ireport-report';
import { WeekDay } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  endpoint: string = environment.apiUrl+'/';
  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), withCredentials:true};
  constructor(private http: HttpClient) { }

  getDataWeek(surveyId: string, startDate: string){
    return this.http.put(this.endpoint+surveyId+"/"+WeekDay,this.httpOptions).pipe(
      map(response => response as IReport)
    );
  }
  getDataWeekBatch(surveyId: string, startDate: string, batchId: string){
    return this.http.put(this.endpoint+surveyId+"/"+WeekDay+"/"+batchId,this.httpOptions).pipe(
      map(response => response as IReport)
    );
  }
}
