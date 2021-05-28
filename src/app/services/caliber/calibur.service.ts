import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Batch } from '../../models/batch';

@Injectable({
  providedIn: 'root'
})
export class CaliburService {

    endpoint: string = "https://caliber2-mock.revaturelabs.com:443/mock/training/batch";
    private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), withCredentials:true};
  
    constructor(private http: HttpClient) { }
  
    getAllBatches(): Observable<Batch[]> {
      return this.http.get<Batch[]>(this.endpoint)
    }
  }