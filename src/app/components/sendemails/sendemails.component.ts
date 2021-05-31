import { Component, OnInit } from '@angular/core';
import { Associate } from 'src/app/models/Caliber/associate';
import { IoService } from 'src/app/services/io/io.service';
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
  surveys: Map<string, ISurvey> = new Map();
  public selectedBatch!: Number;
  public selectedSurvey!: Number;
  constructor(
    private caliberService: CaliberService, 
    private surveyService: SurveyService,
    private ioService: IoService
    ) { }

  ngOnInit(): void {
    this.getAllBatches();
  }

  getAllBatches(): void{
    this.caliberService.getAllBatches()
    .subscribe(data => {this.batches = data;
    });
  }

  setSurveys() : void {
    this.surveyService.getSurveys().subscribe(
      data => {
        this.surveys = data as Map<string, ISurvey>;
      }
    );
  }

  getSurveys(): ISurvey[]{
    let result: ISurvey[] = [];
    if(this.surveys.size === undefined) return result;
    this.surveys.forEach(
      survey => {
        result.push(survey);
      }
    )
    return result;
  }

  send(
    batchId:Number,
    surveyId:Number
  ):void{

    this.caliberService.getAssociatesByBatch(batchId)
    .subscribe(associateData =>{
      associateData.forEach(associate =>{
        this.ioService.sendEmail(
          associate.email,
          "Hi " + associate.firstname + ", you got invited to fill out a survey",
          "Survey request"
          )
      });
    })
  }
}
