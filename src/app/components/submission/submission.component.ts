import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IQuestion } from 'src/app/models/iquestion-question';
import { ISubmission } from 'src/app/models/isubmission-submission';
import { ISurvey } from 'src/app/models/isurvey-survey';
import { SubmissionService } from 'src/app/services/submission/submission.service';
import { SurveyService } from 'src/app/services/survey/survey.service';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { Batch } from 'src/app/models/Caliber/batch';
import { CaliberService } from 'src/app/services/caliber/caliber.service';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.css'],
  providers: [DatePipe],
})
export class SubmissionComponent implements OnInit {
  surveyId!: string;
  submission!: ISubmission;
  submissionForm!: FormGroup;
  survey!: ISurvey;
  questions!: IQuestion[];
  locations: string[] = [];
  batches: Batch[] = [];

  constructor(
    private surveyService: SurveyService,
    private submissionService: SubmissionService,
    private caliberService: CaliberService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private titleService: Title,
    private datePipe: DatePipe,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {
    this.route.params.subscribe(params => {
      this.surveyId = params['surveyId'];
    })
    this.surveyService.getSurveyById(this.surveyId).subscribe(survey => {
      this.survey = survey;
      this.questions = survey.questions;
      this.submissionForm = this.formBuilder.group({
        surveyUuid: this.surveyId,
        responses: this.formBuilder.array([]),
      });
      // Populate the new form with each question and if it's required
      // Set the date with proper timestamp using DatePipe
      // These first six responses are hardcoded for now.
      this.responses.push(this.formBuilder.group({
        question: "Timestamp",
        response: this.datePipe.transform(new Date(), 'yyyy-MM-dd hh:mm:ss'),
      }));
      this.addResponse("Name (Optional)", false);
      this.addResponse("Email (Optional)", false);
      this.addResponse("Where is your training location?", true);
      this.addResponse("What batch are you in?", true);
      this.addResponse("What was your most recently completed week of training? (Extended batches start with Week A, normal batches start with Week 1)", true);
      this.questions.forEach(question => {
        this.addResponse(question.title, question.isRequired);
      })
    })

  }

  get responses() : FormArray {
    return this.submissionForm.get("responses") as FormArray;
  }

  newResponse(question: string, required: boolean) : FormGroup {
    if(required) {
      return this.formBuilder.group({
        question: question,
        response: ['', Validators.required] // Include validator if the field is required
      })
    }
    else {
      return this.formBuilder.group({
        question: question,
        response: '',
      })
    }

  }

  addResponse(question: string, required: boolean) {
    this.responses.push(this.newResponse(question, required));
  }

  ngOnInit(): void {
    this.titleService.setTitle('Submission'+environment.titleSuffix);
    this.setUpBatches();
  }

  submit() {
    if(this.submissionForm.invalid) {
      alert("Please fill out the entire form.");
      return;
    }
    // Convert submissionForm into a submission object. Originally Object.assign, but this caused issues in the JSON for the responses map.
    // It would look like "responses":{"question":"question":"response":"response"} instead of "responses":{"question":"response"}
    let formResponses = this.responses.value;

    let dateString = this.datePipe.transform(new Date(), 'yyyy-MM-dd') || '0000-00-00';

    this.submission = {
      uuid: '',
      surveyUuid: this.submissionForm.get('surveyUuid')?.value,
      batch: 'Mock Batch ' + formResponses[4]['response'], // Fourth response stored in response map
      date: dateString,//formResponses[5]['response'], // Fifth response
      responses: new Map(),
    };

    for(let response of formResponses) {
      this.submission.responses.set(response.question, response.response);
    }

    this.submissionService.submit(this.submission).subscribe(
      data => {
        console.log(data);
        this.snackBar.open("Survey submitted 🙂", undefined, { duration: 2000 });
        }
      ); // Send body as JSON to submission service
    this.submissionForm.reset(); // Clear form. If you try to submit again, questions will be null as this happens when we subscribe to the Survey Observable.
    // Probably better to refresh here.
    this.router.navigate(['/confirmation']);
  }

  setUpBatches(): void {
    this.caliberService.getAllBatches()
    .subscribe(data => {
      this.batches = data;
      this.batches.forEach(
        batch => {
          if (batch.location!= undefined&& this.locations.indexOf(batch.location.valueOf())===-1){
            this.locations.push(batch.location.valueOf());
          }
        }
      )
    });
  }
}
