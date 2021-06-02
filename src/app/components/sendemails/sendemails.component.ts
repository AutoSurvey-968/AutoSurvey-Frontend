import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Associate } from 'src/app/models/Caliber/associate';
import { IoService } from 'src/app/services/io/io.service';
import { environment } from 'src/environments/environment';
import {Batch} from '../../models/Caliber/batch';
import { ISurvey } from '../../models/isurvey-survey';
import {CaliberService} from '../../services/caliber/caliber.service';
import { SurveyService } from '../../services/survey/survey.service';

@Component({
  selector: 'app-sendemails',
  templateUrl: './sendemails.component.html',
  styleUrls: ['./sendemails.component.css']
})

export class SendemailsComponent implements OnInit {

  public batches!: Batch[];
  surveys: Map<string, string> = new Map();
  public surveyIDs: string[] = [];
  public surveyTitles: string[] = [];
  public selectedBatch!: Number;
  public selectedSurvey!: Number;
  constructor(
    private caliberService: CaliberService,
    private surveyService: SurveyService,
    private ioService: IoService,
    private titleService: Title
    ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Email'+environment.titleSuffix);
    this.getAllBatches();
  }

  getAllBatches(): void{
    this.caliberService.getAllBatches()
    .subscribe(data => {this.batches = data;
    });
  }

  setSurveys() : void {
    this.surveyService.getSurveysString().subscribe(
      data => {
       this.surveys=data as Map<string,string>
      });
  }

  send(
    batchId:Number,
    surveyId:Number
  ):void{

    this.caliberService.getAssociatesByBatch(batchId)
    .subscribe(associateData =>{
      associateData.forEach(associate =>{
        console.log(associate);
        console.log(associate.firstName);
        this.ioService.sendEmail(
          associate.email,
          "Hi "+ associate.firstName+", you got invited to fill out a survey: locahost:4200/submit/574ffb00-c2e9-11eb-8918-2fdb812f26a5",
          "Survey request"
          ).subscribe();
      });
    })
  }
}
