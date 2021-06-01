import { Component, Input, NgIterable, OnInit } from '@angular/core';
import { SurveyService } from 'src/app/services/survey/survey.service';
import { Form, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IQuestion } from 'src/app/models/iquestion-question';
import { CaliberService } from 'src/app/services/caliber/caliber.service';
import {Batch} from '../../models/Caliber/batch';
import { MatFormFieldControl } from '@angular/material/form-field';
import { ISurvey } from 'src/app/models/isurvey-survey';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { subscribeOn } from 'rxjs/operators';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css'],
  providers: [
    { provide: MatFormFieldControl, useExisting: SurveyComponent}
  ]
})
export class SurveyComponent implements OnInit {
  @Input() questionData?: FormArray;
  surveyForm!: FormGroup;

  constructor (
    private surveyService: SurveyService,
    private formBuilder: FormBuilder,
    private caliberService: CaliberService,
    private titleService: Title
  ) {
    this.surveyForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', Validators.required],
      confirmation: ['Thank you for filling out this survey', Validators.required],
      questions: this.formBuilder.array([]),
    });
  }

  ngOnInit(): void {

  }

  submit() {
    if (this.surveyForm.invalid) return;

    // this.surveyService.addSurvey(this.survey).subscribe((data) => {
    //   console.log(data);
    // });
  }

  getQuestions(): NgIterable<any> {
    return this.surveyForm.get("questions")?.value;
  }

  addQuestion() {
    let array: FormArray = this.surveyForm.get('questions') as FormArray;
    array.push(this.formBuilder.group({
      questionType: ['RADIO', [Validators.required]],
      title: ['', [Validators.required]],
      choices: this.formBuilder.array([]),
    }))
  }

  removeQuestion(event: number) {
    let formArray: FormArray = this.surveyForm.get("question") as FormArray;
    formArray.removeAt(event);
  }
}

// export class SurveyComponent implements OnInit {
//   survey!: ISurvey;
//   surveyForm: FormGroup;
//   questionArray: IQuestion[] = [];
//   selectedValue: string[] = [];

//   constructor(
//     private surveyService: SurveyService,
//     private formBuilder: FormBuilder,
//     private caliberService: CaliberService,
//     private titleService: Title
//   ) {
//     this.surveyForm = this.formBuilder.group({
//       surveyName: [' ', [Validators.required]],
//       description: [null, Validators.required],
//       questions: this.formBuilder.array([]),
//     });
//    }

//   ngOnInit(): void {
//     this.titleService.setTitle('Survey'+environment.titleSuffix);
//   }

//   addSurvey(): void {
//     if (!this.surveyForm.valid) {
//       return;
//     }

//     for (let question of this.surveyForm.value.questions) {
//       let exportQuestion = {} as IQuestion;
//       exportQuestion.title = "title";
//       exportQuestion.questionType = this.selectedValue[0];
//       exportQuestion.helptText = '';
//       exportQuestion.isrequired = true;
//       exportQuestion.hasotherOption = false;
//       exportQuestion.choices = ["choice 1", "choice 2"];
//       this.questionArray.push(exportQuestion);
//     }

//     this.survey = {} as ISurvey;
//     this.survey.title = this.surveyForm.value.surveyName;
//     this.survey.description = this.surveyForm.value.description;
//     this.survey.confirmation = 'Thank you for submitting the survey!';
//     this.survey.version = '1';
//     this.survey.questions = this.questionArray;

//     console.log(JSON.stringify(this.survey));
//     // this.surveyService.addSurvey(this.survey).subscribe((data) => {
//     //   console.log(data);
//     // });
//   }

//   getQuestionFormArray(): FormArray {
//     return this.surveyForm.get("questions") as FormArray;
//   }

//   newQuestion(): FormGroup {
//     return this.formBuilder.group({
//       quest: '',
//       questionType: '',
//       response: [],
//     })
//   }

//   addQuestion() {
//     this.getQuestionFormArray().push(this.newQuestion());
//   }

//   removeQuestion(index: number) {
//     this.getQuestionFormArray().removeAt(index);
//   }
// }
