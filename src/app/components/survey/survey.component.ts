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
import { HttpErrorResponse } from '@angular/common/http';

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
  isQuestion: boolean = true;
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
    if (this.isQuestion){
      if (this.surveyForm.invalid) {
        this.snackBar.open("Please make sure fields are fill out.", undefined, { duration: 2000 });
        console.log("invalid");
        return;
      }
      let survey = this.getChoices(this.surveyForm.value as ISurvey);
      console.log(survey);
      
      if (this.surveyForm.invalid) {
        this.snackBar.open("Please make sure fields are fill out.", undefined, { duration: 2000 });
        console.log("invalid");
        return;
      }
      this.surveyService.addSurvey(survey as ISurvey).subscribe((data) => {
        this.snackBar.open("Survey created!", undefined, { duration: 2000 });
      }, 
      (error: HttpErrorResponse) => {
        if (error.status >= 500){
          this.snackBar.open("Server Error. Please try again.", undefined, { duration: 2000 });
        } else {
          this.snackBar.open("Problem with the survey, please try again.", undefined, { duration: 2000 });
        }
      });
    } else {
      if (this.title.invalid || this.description.invalid || this.confirmation.invalid || !this.fileUpload.get('file')?.value){
        this.snackBar.open("Make sure all fields are filled out then submit again.", undefined, { duration: 2000 });
        return;
      }
      let formData = new FormData();
      formData.append("title", this.title.value);
      formData.append("description", this.description.value);
      formData.append("confirmation", this.confirmation.value);
      formData.append("file", this.fileUpload.get('file')?.value);

      this.surveyService.upload(formData).subscribe(data =>{
        this.snackBar.open("The survey has been uploaded!", undefined, { duration: 2000 });
      }, 
      (error: HttpErrorResponse) =>{
        if (error.status >= 500){
          this.snackBar.open("Problem with server. Please try again.", undefined, { duration: 2000 });
        } else {
          this.snackBar.open("The survey is invalid. Please fix and try again.", undefined, { duration: 2000 });
          console.log(error);
        }
      });
    }
  }

  getQuestionTitle(index: number) {
    let formGroup = this.questions.controls[index] as FormGroup;
    return formGroup.get("title") as FormControl;
  }

  getQuestionTypeAsString(index: number) {
    let formGroup = this.questions.controls[index] as FormGroup;
    return formGroup.get("questionType")?.value;
  }

  getQuestionTypeAsFormControl(index: number) {
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
  }

  onSelected(event: MatSelectChange, i: number) {

    let formGroup = this.questions.controls[i] as FormGroup;
    console.log(event.value);
    formGroup.get("type")?.setValue(event);
    document.getElementById("appChoices"+i)?.setAttribute("choice",event.value);
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

  update(choiceData:FormArray, i: number){
    this.questions.value[i].choices = choiceData;
    console.log(this.questions.value[i].choices);
  }

  removeQuestion(index: number) {
    this.questions.removeAt(index);
  }

  getChoices(survey: ISurvey): ISurvey{
    for (let i = 0; i < survey.questions.length; i++){
      if (this.questions.at(i).value.choices?.value){
        let choices = this.questions.at(i).value.choices?.value[0];
        let arr: string[] = [];
          for (const [key, value] of Object.entries(choices)){
            if (value !== ''){
              arr.push(value as string);
            }
          }
          survey.questions[i].choices = arr;
      }
    }
    return survey;
  }

  changeQuestionStatus(status: boolean, id: string) {
    this.isQuestion = status;

    let elements = document.getElementsByClassName("tab");
    for (let i = 0; i < elements.length; i++){
      elements[i].className = elements[i].className.replace(' active', '');
    }

    let activeTab = document.getElementById(id);
    if (activeTab){
      activeTab.className += ' active';
    }
    
  }
}

