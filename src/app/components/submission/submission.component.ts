import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IQuestion } from 'src/app/models/iquestion-question';
import { ISubmission } from 'src/app/models/isubmission-submission';
import { ISurvey } from 'src/app/models/isurvey-survey';
import { SubmissionService } from 'src/app/services/submission/submission.service';
import { SurveyService } from 'src/app/services/survey/survey.service';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.css']
})
export class SubmissionComponent implements OnInit {
  surveyId!: string;
  submission!: ISubmission;
  submissionForm!: FormGroup;
  survey!: ISurvey;
  questions!: IQuestion[];

  constructor(
    private surveyService: SurveyService,
    private submissionService: SubmissionService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private titleService: Title,
  ) {
    this.route.params.subscribe(params => {
      this.surveyId = params['surveyId'];
    })
    this.surveyService.getSurveyById(this.surveyId).subscribe(survey => {
      this.survey = survey;
      this.questions = survey.questions;
      this.submissionForm = this.formBuilder.group({
        batch: ['', Validators.required],
        week: ['', Validators.required],
        surveyUuid: this.surveyId,
        responses: this.formBuilder.array([]),
      });
      // Populate the new form with each question
      this.addResponse("Name (Optional)");
      this.addResponse("Email (Optional)");
      this.addResponse("Where is your training location?");
      this.questions.forEach(question => {
        this.addResponse(question.title);
      })
    })

  }

  get responses() : FormArray {
    return this.submissionForm.get("responses") as FormArray;
  }

  newResponse(question: string) : FormGroup {
    return this.formBuilder.group({
      question: question,
      response: '',
    })
  }

  addResponse(question: string) {
    this.responses.push(this.newResponse(question));
  }

  ngOnInit(): void {
    this.titleService.setTitle('Submission'+environment.titleSuffix);
    this.populateBatches();
    this.populateLocations();
  }

  submit() {
    console.log(this.submissionForm);
    // this.submissionService.submit(this.submission);
  }

  populateBatches() {
    let xhttp = new XMLHttpRequest();
    let batchSelect = document.getElementById("batch") as HTMLSelectElement;
    xhttp.onreadystatechange = function () {
      if(this.readyState == 4 && this.status == 200){
        let batches = JSON.parse(this.responseText.valueOf());
        for(let batch of batches){
          var option = document.createElement("option");
          option.value = batch.name;
          option.text = batch.skill + " - " + batch.employeeAssignments[0].employee.firstName + " " + batch.employeeAssignments[0].employee.lastName;
          batchSelect.add(option);
        }
      }
    }
    // Change this to calilber
    xhttp.open("GET", "https://caliber2-mock.revaturelabs.com:443/mock/training/batch/current", true);
    xhttp.setRequestHeader("Content-Type","application/json")
    xhttp.setRequestHeader("Accept", "*/*");
    xhttp.send();
  }

  populateLocations() {
    let xhttp = new XMLHttpRequest();
    let locationSelect = document.getElementById("location") as HTMLSelectElement;
    xhttp.onreadystatechange = function () {
      if(this.readyState == 4 && this.status == 200){
        let locations = JSON.parse(this.responseText);
        for(let location of locations){
          let option = document.createElement("option");
          option.value = location;
          option.text = location;
          locationSelect.add(option);
        }
      }
    }
    // Change this to calilber
    xhttp.open("GET", "https://caliber2-mock.revaturelabs.com:443/mock/training/batch/locations", true);
    xhttp.setRequestHeader("Content-Type","application/json")
    xhttp.setRequestHeader("Accept", "*/*");
    xhttp.send();
  }
}
