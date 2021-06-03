import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Batch } from '../../models/Caliber/batch';
import { Associate } from 'src/app/models/Caliber/associate';

@Injectable({
  providedIn: 'root'
})
export class CaliberService {

    endpoint: string = "https://caliber2-mock.revaturelabs.com/mock/training/batch?quarter=1&year=2020";
    private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), withCredentials:true};
  
    constructor(private http: HttpClient) { }
  
    getAllBatches(): Observable<Batch[]> {
      return this.http.get<Batch[]>(this.endpoint);
    }

    getAssociatesByBatch(
      id:Number
    ):Observable<Associate[]>{
      alert("getting associates")
      return this.http.get<Associate[]>("https://caliber2-mock.revaturelabs.com/mock/training/batch/TR-1079/associates");
    }
  }