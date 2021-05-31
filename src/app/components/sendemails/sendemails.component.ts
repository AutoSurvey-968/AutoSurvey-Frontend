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
  public surveys!: ISurvey[];
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

  getAllBatches():void{
    console.log("a");
    this.caliberService.getAllBatches()
    .subscribe(data => {this.batches = data;
    });
  }

  getSurveys():void{
    this.surveyService.getSurveys()
    .subscribe(data => {this.surveys = data})
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
