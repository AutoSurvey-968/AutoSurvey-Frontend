import { Component, Input, NgIterable, OnInit } from '@angular/core';
import { SurveyService } from 'src/app/services/survey/survey.service';
import { AbstractControl, Form, FormArray, FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { IQuestion } from 'src/app/models/iquestion-question';
import { CaliberService } from 'src/app/services/caliber/caliber.service';
import {Batch} from '../../models/Caliber/batch';
import { MatFormFieldControl } from '@angular/material/form-field';
import { ISurvey } from 'src/app/models/isurvey-survey';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { subscribeOn } from 'rxjs/operators';
import { MatSelectChange } from '@angular/material/select';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css'],
  providers: [
    { provide: MatFormFieldControl, useExisting: SurveyComponent}
  ],
})
export class SurveyComponent implements OnInit {
  surveyForm!: FormGroup;
  title = new FormControl('', Validators.required);
  description = new FormControl('', Validators.required);
  confirmation = new FormControl('Thanks for taking this survey!',  Validators.required);
  questions: FormArray = new FormArray([]);
  questionType: FormControl = new FormControl('', Validators.required);
  typeOptions = [
    'CHECKBOX',
    'DROPDOWN',
    'MULTIPLE_CHOICE',
    'PARAGRAPH',
    'RADIO',
    'SHORT_ANSWER',
  ]

  constructor (
    private surveyService: SurveyService,
    private formBuilder: FormBuilder,
    private caliberService: CaliberService,
    private titleService: Title,
  ) {}

  ngOnInit(): void {
    this.surveyForm = this.formBuilder.group({
      title: this.title,
      description: this.description,
      confirmation: this.confirmation,
      questions: this.questions,
    });
  }

  submit() {
    console.log(this.surveyForm.value as ISurvey);
    if (this.surveyForm.invalid) return;
    this.surveyService.addSurvey(this.surveyForm.value as ISurvey).subscribe((data) => {
      console.log(data);
    });
  }

  getQuestionTitle(index: number) {
    let formGroup = this.questions.controls[index] as FormGroup;
    return formGroup.get("title") as FormControl;
  }

  getQuestionType(index: number) {
    let formGroup = this.questions.controls[index] as FormGroup;
    return formGroup.get("questionType") as FormControl;
  }

  getQuestion(index: number) {
    return this.questions.get(index.toString())?.value;
  }

  getQuestionAsFormControl(index: number) {
    return this.surveyForm.get('questions')?.value[index] as FormControl;
  }


  onSelected(event: MatSelectChange) {

    //let formGroup = this.questions.controls[index] as FormGroup;
    console.log("HELLO");
   // formGroup.get("type")?.setValue(event);
  }

  addQuestion() {
    this.questions.push(
      new FormGroup({
        title: new FormControl('', Validators.required),
        questionType: new FormControl('', Validators.required),
        choices: new FormArray([]),
      })
    );
  }

  removeQuestion(index: number) {

    this.questions.removeAt(index);
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
