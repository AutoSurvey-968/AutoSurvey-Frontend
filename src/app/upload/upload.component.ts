import { Component, Input, OnInit } from '@angular/core';
import { ISurvey } from '../isurvey.survey';
import { SurveyService } from '../survey.service';
import { UploadService } from '../upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  @Input() activeSurvey!: ISurvey;
  @Input() file!: File;
  surveys: ISurvey[] = this.surveyService.getSurveys();

  constructor(
    private surveyService: SurveyService,
    private uploadService: UploadService
  ) { }

  ngOnInit(): void {
  }

  submitFile(): void {
    this.uploadService.upload(this.activeSurvey.uuid, this.surveys);
  }
}
