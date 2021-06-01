import { Component, Input, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { ISurvey } from '../../models/isurvey-survey';
import {  SurveyService } from '../../services/survey/survey.service';
import { UploadService } from '../../services/upload/upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  @Input() selectedSurveyUuid!: string;
  @Input() file!: File;
  surveys: Map<string, ISurvey> = new Map();

  constructor(
    private surveyService: SurveyService,
    private uploadService: UploadService,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Upload'+environment.titleSuffix);
    this.setSurveys();
  }

  upload(): void {
    this.uploadService.upload(this.selectedSurveyUuid, this.surveys).subscribe(
       data => {}
    );
  }

  setSurveys() : void {
    this.surveyService.getSurveys().subscribe(
      data => {
        console.log(data)
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
