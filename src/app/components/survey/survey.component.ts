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
import { MatSnackBar } from '@angular/material/snack-bar';

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
  fileUpload: FormGroup;
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
    private snackBar: MatSnackBar,
  ) {
    this.fileUpload = this.formBuilder.group({
      file: null
    })
  }

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
    this.snackBar.open("Survey created!", undefined, { duration: 2000 });
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

  upload(event: Event) {
    let file = (event?.target as any)?.files[0];
    this.fileUpload.patchValue({
      file: file
    })
    console.log(file);
    for (let i = 0; i < this.questions.length; i++){
      this.removeQuestion(i);
    }
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

