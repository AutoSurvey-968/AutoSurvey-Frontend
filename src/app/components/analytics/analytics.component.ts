import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {
  active = 1;
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  constructor(private _snackBar: MatSnackBar) { }
  ngOnInit(): void {

  }
  getData(){
    if (this.active==1 && this.range.get('start')!=null &&this.range.get('start')?.value!=null ){
      alert(this.range.get('start')?.value );
    }
    else if (this.active==2 && this.range.get('start')!=null &&this.range.get('start')?.value!=null ){
     // alert({{this.range.get('start')?.value | json}} );
    }
    else{
     
      this._snackBar.open("Form isn't fully filled out", "Okay");
      setTimeout(this._snackBar.dismiss.bind(this._snackBar), 1500);
      
    }
    
  }

}

