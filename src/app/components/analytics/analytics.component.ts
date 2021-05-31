import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { ISurvey } from '../../models/isurvey-survey';
import { AnalyticsService } from '../../services/analytics/analytics.service';
import {SurveyService} from '../../services/survey/survey.service'
import {CaliberService} from '../../services/caliber/caliber.service';
import { Batch } from 'src/app/models/Caliber/batch';
import { DateAdapter } from '@angular/material/core';
import { IReport } from 'src/app/models/ireport-report';
import { getInterpolationArgsLength } from '@angular/compiler/src/render3/view/util';

//still need to take care of dates

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnalyticsComponent implements OnInit {
  constructor(private _dateAdapter: DateAdapter<Date>,private analyticsService: AnalyticsService, private surveyService: SurveyService, private caliberService: CaliberService) { }

  active = 1;
  range = new FormGroup({
    start: new FormControl(Validators),
    end: new FormControl(Validators)
  });
  surveyWeek = new FormControl('',Validators.required);
  surveyWeekBatch = new FormControl('',Validators.required);
  locationSelect = new FormControl('', Validators.required);
  batchSelect = new FormControl('', Validators.required);
  weekSelect = new FormControl('', Validators.required);
  form1= new FormGroup({
    survey: this.surveyWeek,
    week: this.range
  })
  form2= new FormGroup({
    //survey: this.surveyWeekBatch,
    location: this.locationSelect,
    batch: this.batchSelect,
    week: this.weekSelect
  });

  surveys: Map<string, ISurvey> = new Map();
  locations: string[] = [];
  originalBatches: Batch[] = [];
  batches: Batch[] = [];
  weeks: Date[] = [];

  parentReport?: IReport;

  ngOnInit(): void {
    //this.setSurveys();//it should be set that if it does errors it doesn't break
    this.setUpBatches();
  }
  pipe = new DatePipe('en-US');
  getData(){
    if (this.active==1){
      this.analyticsService.getDataWeek(this.surveyWeek.value,this.pipe.transform(this.range.get('start')?.value, 'yyyy-MM-dd')||"").subscribe((data: IReport)=>{
        this.parentReport= {
          surveyId: data.surveyId,
          weekEnum: data.weekEnum,
          batchString: data.batchString,
          averages: data.averages,
          percentages: data.percentages
        }
      });
    }
    else if (this.active==2){
      this.analyticsService.getDataWeekBatch(this.surveyWeekBatch.value, this.pipe.transform(this.weekSelect.value, 'yyyy-MM-dd')||"", this.batchSelect.value).subscribe((data: IReport)=>{
        this.parentReport= {
          surveyId: data.surveyId,
          weekEnum: data.weekEnum,
          batchString: data.batchString,
          averages: data.averages,
          percentages: data.percentages
        }
      });    }
  }

  setSurveys(){
    this.surveyService.getSurveys().subscribe(
      data => {
        this.surveys = data as Map<string, ISurvey>;
      }
    );
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
//pulls in batches and generates locations
  setUpBatches(): void {
    this.caliberService.getAllBatches()
    .subscribe(data => {
      this.originalBatches = data;
      this.originalBatches.forEach(
        batch => {
          if (batch.location!= undefined&& this.locations.indexOf(batch.location.valueOf())===-1){
            this.locations.push(batch.location.valueOf());
          }
        }
      )
    });
  }
  //limit number of batches available by location
  selectedValueActionLocation(event: MatSelectChange): void {
    this.batches = [];
    this.batches=this.originalBatches.filter(b=>b.location===event.value)
 }
  //limit date ranges available by batch
  selectedValueActionBatch(event: MatSelectChange): void {
    this.weeks=[];
    let selectedBatch: Batch =this.batches.filter(b=>b.id===event.value)[0];
   let startDate: Date= new Date(selectedBatch.startDate as string);
   let endDate: Date= new Date(selectedBatch.endDate as string);
   startDate=this._dateAdapter.addCalendarDays(startDate, 1-this._dateAdapter.getDayOfWeek(startDate));
   endDate=this._dateAdapter.addCalendarDays(endDate, 1-this._dateAdapter.getDayOfWeek(endDate));
   let tempWeeks: Date[] =[];
   for (let increment=startDate; increment<=endDate; increment=this._dateAdapter.addCalendarDays(increment,7)){
    tempWeeks.push(increment);
   }
    this.weeks=tempWeeks;
  }

}

