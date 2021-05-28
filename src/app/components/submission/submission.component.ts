import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ISubmission } from 'src/app/models/isubmission-submission';
import { ISurvey } from 'src/app/models/isurvey-survey';
import { SubmissionService } from 'src/app/services/submission/submission.service';
import { SurveyService } from 'src/app/services/survey/survey.service';

@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.css']
})
export class SubmissionComponent implements OnInit {
  surveyId!: string;
  @Input() submission!: ISubmission;
  survey: ISurvey = this.surveyService.getSurveyById(this.surveyId);

  constructor(
    private surveyService: SurveyService,
    private submissionService: SubmissionService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      this.surveyId = params['surveyId'];
      console.log("Survey ID: " + this.surveyId);
    })
  }



  ngOnInit(): void {
    this.populateBatches();
    this.populateLocations();
  }

  submitSubmission() {
    this.submissionService.submit(this.submission);
  }

  populateBatches() {
    let xhttp = new XMLHttpRequest();
    var batchSelect = document.getElementById("batch") as HTMLSelectElement;
    xhttp.onreadystatechange = function () {
      if(this.readyState == 4 && this.status == 200){
        var batches = JSON.parse(this.responseText.valueOf());
        for(let batch of batches){
          var option = document.createElement("option");
          option.value = batch.name;
          option.text = batch.skill + " - " + batch.employeeAssignments[0].employee.firstName + " " + batch.employeeAssignments[0].employee.lastName;
          batchSelect.add(option);
        }
      }
    }

    xhttp.open("GET", "https://caliber2-mock.revaturelabs.com:443/mock/training/batch/current", true);
    xhttp.setRequestHeader("Content-Type","application/json")
    xhttp.setRequestHeader("Accept", "*/*");
    xhttp.send();
  }

  populateLocations() {
    let xhttp = new XMLHttpRequest();
    var locationSelect = document.getElementById("location") as HTMLSelectElement;
    xhttp.onreadystatechange = function () {
      if(this.readyState == 4 && this.status == 200){
        var locations = JSON.parse(this.responseText);
        for(let location of locations){
          let option = document.createElement("option");
          option.value = location;
          option.text = location;
          locationSelect.add(option);
        }
      }
    }

    xhttp.open("GET", "https://caliber2-mock.revaturelabs.com:443/mock/training/batch/locations", true);
    xhttp.setRequestHeader("Content-Type","application/json")
    xhttp.setRequestHeader("Accept", "*/*");
    xhttp.send();
  }
  // Note for whoever does the JS for this:

  // For the radio buttons, something like the following should
  // theoretically pull the correct value selected even though they aren't in individual forms:

  //document.querySelector('input[name="understanding"]:checked').value;
  //document.querySelector('input[name="questionsEncouraged"]:checked').value;

}
