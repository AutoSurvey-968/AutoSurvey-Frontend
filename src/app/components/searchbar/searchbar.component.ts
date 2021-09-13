import { Component, Input, OnInit } from '@angular/core';
import { SurveyService } from 'src/app/services/survey/survey.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { ISurvey } from 'src/app/models/isurvey-survey';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css'],
})
export class SearchbarComponent implements OnInit {
  @Input() 
  searchInput!: string;
  survey!: ISurvey;



  constructor(
    public surveyService: SurveyService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private titleService: Title,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("SurveySearch" + environment.titleSuffix);


    // console.log(this.searchResult);
  }

  search(): void {
      this.router.navigateByUrl('/search');
      this.surveyService
        .getSurveyByTitle(this.searchInput)
        .subscribe((data) => {
          this.survey = data;
        },
        (error: HttpErrorResponse) => {
          if (error.status >= 500){
            this.snackBar.open("Problem with the server. Please try again.", undefined, { duration: 2000 });
          } else {
            this.snackBar.open("No survey with that name.", undefined, { duration: 2000 });
          }
        });

  }

  delete() {
    this.surveyService.deleteSurvey(this.survey.uuid).subscribe(data => {
      this.snackBar.open("The survey has been deleted.", undefined, { duration: 2000 });
      this.searchInput = "";
    },
    (error: HttpErrorResponse) => {
      if (error.status >= 500){
        this.snackBar.open("Problem with the server. Please try again.", undefined, { duration: 2000 });
        
      } else {
        this.snackBar.open("Could not find the survey to delete.", undefined, { duration: 2000 });
      }
    });

  }


}
