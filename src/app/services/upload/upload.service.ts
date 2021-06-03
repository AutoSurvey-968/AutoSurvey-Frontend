import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ISurvey } from '../../models/isurvey-survey';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private endpoint: string = environment.apiUrl+'/responses';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/csv',
      'Authorization': 'Bearer '+localStorage.getItem('token')
    }),
    withCredentials: true
  };

  constructor(
    public formBuilder: FormBuilder,
    private http:  HttpClient,
    private snackBar: MatSnackBar
  ) {}

  upload(surveyId: string, formData: FormData) {
    this.snackBar.open("CSV uploaded", undefined, {duration: 2000});
    this.endpoint += surveyId;
    console.log(this.endpoint);
    console.log(formData);
    // this.http.post(this.endpoint, formData).subscribe(
    //   (response) => console.log(response),
    //   (error) => console.log(error)
    // )
  }

}
