import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatSelectChange } from '@angular/material/select';
import { ISurvey } from '../../models/isurvey-survey';
import { AnalyticsService } from '../../services/analytics/analytics.service';
import {SurveyService} from '../../services/survey/survey.service'

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
  constructor(private _snackBar: MatSnackBar, private analyticsService: AnalyticsService, private surveyService: SurveyService) { }
  @Input() selectedSurveyUuid!: string;
  surveys: Map<string, ISurvey> = new Map();

  ngOnInit(): void {
    //this.setSurveys();//it should be set that if it does errors it doesn't break
  }
  pipe = new DatePipe('en-US');
  getData(){
    if (this.active==1 && this.range.get('start')!=null &&this.range.get('start')?.value!=null ){
      this.analyticsService.getDataWeek("",this.pipe.transform(this.range.get('start')?.value, 'yyyy-MM-dd')||"");
    }
    else if (this.active==2 && this.range.get('start')!=null &&this.range.get('start')?.value!=null ){
      this.analyticsService.getDataWeekBatch("", this.pipe.transform(this.range.get('start')?.value, 'yyyy-MM-dd')||"", "");    }
    else{
      this._snackBar.open("Form isn't fully filled out", "Okay");
      setTimeout(this._snackBar.dismiss.bind(this._snackBar), 2000);
    }
  }

  setSurveys(){
    this.surveyService.getSurveys().subscribe(
      data => {
        this.surveys = data as Map<string, ISurvey>;
      }
    );
  }

  selectedValueAction(event: MatSelectChange): void {
    this.selectedSurveyUuid = event.value;
    console.log(this.selectedSurveyUuid);
  }

  getSurveys(): ISurvey[] {
    let result: ISurvey[] = [];
    if(this.surveys.size === undefined) return result;
    this.surveys.forEach(
      survey => {
        result.push(survey);
      }
    )
    return result;
  }

}

