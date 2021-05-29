import { Component, OnInit } from '@angular/core';
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
  public selectedBatch?: Batch;
  public selectedSurvey?: ISurvey;
  constructor(private caliberService: CaliberService, private surveyService: SurveyService) { }


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
    this.surveys = this.surveyService.getSurveys()
  }

  send():void{
    
  }
}
