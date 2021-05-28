import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Batch } from './batch';

@Injectable({
  providedIn: 'root'
})
export class CaliburService {

    endpoint: string = "https://caliber2-mock.revaturelabs.com:443/mock/training/batch";
    private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), withCredentials:true};
  
    constructor(private http: HttpClient) { }
  
    getAllBatches(): Observable<batch[]> {  

      let batches = of(Batch);
      return this.http.get(this.endpoint).pipe(
        map(response => response as Batch[])
      );
    }
  }