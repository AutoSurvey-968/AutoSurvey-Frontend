import { Component, Input, OnInit } from '@angular/core';
import { ISurvey } from '../../models/isurvey-survey';
import { SurveyService } from '../../services/survey/survey.service';
import { UploadService } from '../../services/upload/upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  @Input() activeSurvey!: ISurvey;
  @Input() file!: File;
  surveys: ISurvey[] = [];

  constructor(
    private surveyService: SurveyService,
    private uploadService: UploadService
  ) { }

  ngOnInit(): void {
    this.setSurveys();
  }

  upload(): void {
    this.uploadService.upload(this.activeSurvey.uuid, this.surveys).subscribe(
       data => {}
    );
  }

  setSurveys() : void {
    this.surveyService.getSurveys().subscribe(
      data => {this.surveys = data;}
    );
  }
}
