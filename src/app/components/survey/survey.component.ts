import { Component, OnInit } from '@angular/core';
import { SurveyService } from 'src/app/services/survey/survey.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IQuestion } from 'src/app/models/iquestion.question';
import { CaliberService } from 'src/app/services/caliber/caliber.service';
import {Batch} from '../../models/Caliber/batch';
import { MatFormFieldControl } from '@angular/material/form-field';
import { ISurvey } from 'src/app/models/isurvey-survey';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css'],
  providers: [
    { provide: MatFormFieldControl, useExisting: SurveyComponent}
  ]
})
export class SurveyComponent implements OnInit {
  survey!: ISurvey;
  surveyForm: FormGroup;
  public batches!: Batch[];
  surveyQuestions!: IQuestion [];
  question!: IQuestion;

  constructor(
    private surveyService: SurveyService,
    private formBuilder: FormBuilder,
    private caliberService: CaliberService,
    private titleService: Title
  ) {
    this.surveyForm = this.formBuilder.group({
      surveyName: [' ', [Validators.required]],
      batch: [null, Validators.required],
      questions: this.formBuilder.array([]),
    });
   }

  ngOnInit(): void {
    this.titleService.setTitle('Survey'+environment.titleSuffix);
    this.getAllBatches();
  }

  addSurvey(): void {
    if(!this.surveyForm.valid){
      return;
    }
    this.survey = Object.assign({}, this.surveyForm.value);

    alert(this.survey.title);
    this.surveyService.addSurvey(this.survey).subscribe((data) => {
      console.log(data);
    });
  }

  getAllBatches():void{
    this.caliberService.getAllBatches()
    .subscribe(data => {this.batches = data;
    });
  }

  questions(): FormArray {
    return this.surveyForm.get("questions") as FormArray
  }

  newQuestion(): FormGroup {
    return this.formBuilder.group({
      quest: '',
      questionType: '',
    })
  }

  addQuestion() {
    this.questions().push(this.newQuestion());
  }

  removeQuestion(i:number) {
    this.questions().removeAt(i);
  }
}
