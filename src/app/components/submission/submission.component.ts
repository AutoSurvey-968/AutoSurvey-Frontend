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
import { Batch } from 'src/app/models/Caliber/batch';
import { CaliberService } from 'src/app/services/caliber/caliber.service';
import { DatePipe } from '@angular/common';

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
      // Populate the new form with each question and if it's required
      // Set the date with proper timestamp using DatePipe
      this.responses.push(this.formBuilder.group({
        question: "Timestamp",
        response: this.datePipe.transform(new Date(), 'yyyy-MM-dd hh:mm:ss'),
      }));
      this.addResponse("Name (Optional)", false);
      this.addResponse("Email (Optional)", false);
      this.addResponse("Where is your training location?", true);
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
    this.submission = Object.assign({}, this.submissionForm.value);
    this.submissionService.submit(this.submission).subscribe(data => console.log(data)); // Send body as JSON to submission service
    this.submissionForm.reset(); // Clear form. If you try to submit again, questions will be null as this happens when we subscribe to the Survey Observable.
    // Probably better to refresh here.
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
