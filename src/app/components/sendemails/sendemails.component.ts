import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  surveyWeek = new FormControl('',Validators.required);


  constructor(
    private caliberService: CaliberService,
    private surveyService: SurveyService,
    private ioService: IoService,
    private titleService: Title,
    private snackBar: MatSnackBar
    ) { }

  private openSnackbar(message : string) {
    this.snackBar.open(message, undefined, {duration: 2000});
  }

  ngOnInit(): void {
    this.titleService.setTitle('Email'+environment.titleSuffix);
    this.getAllBatches();
    this.setSurveys();
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

    console.log(batchId)
    let batch = this.batches.find(bat => {
      if (bat.batchId){
        return batchId.toString() == bat.batchId;
      }
      return false;
    });
    this.caliberService.getAssociatesByBatch(batchId)
    .subscribe(associateData =>{
      associateData.forEach(associate =>{
        this.ioService.sendEmail(
          associate.email,
          `Hi MockUser, you got invited to fill out a survey: http://localhost:4200/submit/${this.surveyWeek.value[0]}?batchId=${batchId}&location=+${batch?.location}`,
          "Survey request"
          ).subscribe();
      });
    })
    this.openSnackbar("Email sent!");
  }
}
