import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  endpoint: string = environment.apiUrl+'/';
  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), withCredentials:true};
  constructor(private http: HttpClient) { }

  getDataWeek(startDate: string){
    let body={
      "startDate":startDate
    }
    return this.http.put(this.endpoint, body,this.httpOptions).pipe(
      map(response => response as string)
    );
  }
  getDataWeekBatch(startDate: string, batchId: string){

  }
}
