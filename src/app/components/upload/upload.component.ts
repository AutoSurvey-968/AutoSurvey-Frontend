import { Component, Input, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { ISurvey } from '../../models/isurvey-survey';
import { MockSurveyService, SurveyService } from '../../services/survey/survey.service';
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
    private surveyService: MockSurveyService,
    private uploadService: UploadService
  ) { }

  ngOnInit(): void {
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
        data.forEach( survey => {
          this.surveys.set(survey.uuid, survey);
        });
      }
    );
  }

  selectedValueAction(event: MatSelectChange): void {
    this.selectedSurveyUuid = event.value;
    console.log(this.selectedSurveyUuid);
  }

  getSurveys(): ISurvey[] {
    let result: ISurvey[] = [];
    this.surveys.forEach(
      survey => {
        result.push(survey);
      }
    )
    return result;
  }
}
