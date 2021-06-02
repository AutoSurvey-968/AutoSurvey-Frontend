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
  endpoint: string = environment.apiUrl+'/reports';
  private httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer '+localStorage.getItem('token')}), withCredentials:true};
  constructor(private http: HttpClient) { }

  getDataWeek(surveyId: string, startDate: string){
    return this.http.get(this.endpoint+"?surveyId="+surveyId+"&weekDay="+startDate,this.httpOptions).pipe(
      map(response => response as IReport)
    );
  }
  getDataWeekBatch(surveyId: string, startDate: string, batchId: string){
    console.log(this.httpOptions.headers)
    return this.http.get(this.endpoint+"?surveyId="+surveyId+"&weekDay="+startDate+"&batchId="+batchId,this.httpOptions).pipe(
      map(response => response as IReport)
    );
  }
}
