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
      'Authorization': 'Bearer '+localStorage.getItem('token')
    }),
    withCredentials: true
  };

  constructor(
    public formBuilder: FormBuilder,
    private http:  HttpClient,
    private snackBar: MatSnackBar
  ) {}
  upload(formData: FormData) {
    this.snackBar.open("CSV uploaded", undefined, {duration: 2000});
    this.httpOptions.headers.delete('Content-Type');
    this.http.post(this.endpoint, formData, this.httpOptions).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    )
  }
}
