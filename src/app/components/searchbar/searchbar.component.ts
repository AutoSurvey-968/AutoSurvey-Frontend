import { Component, Input, OnInit } from '@angular/core';
import { SurveyService } from 'src/app/services/survey/survey.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { ISurvey } from 'src/app/models/isurvey-survey';
import { IQuestion } from 'src/app/models/iquestion-question';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css'],
})
export class SearchbarComponent implements OnInit {
  @Input() searchInput!: string;
  searchResult: String[] = [];
  resultQuestions!: IQuestion[];



  constructor(

    public surveyService: SurveyService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("SurveySearch" + environment.titleSuffix);


    // console.log(this.searchResult);
  }

  search(): void {
    try {
      this.router.navigateByUrl('/search');
      this.surveyService
        .getSurveyByTitle(this.searchInput)
        .subscribe((data) => this.searchResult = [data.title, data.createdOn, data.description,
        data.confirmation]);
      this.surveyService
        .getSurveyByTitle(this.searchInput)
        .subscribe((d) => this.resultQuestions = d.questions);

      console.log("result questions: " + this.resultQuestions)

    } catch (Exception) {
      console.log(Exception);
    }
  }
  // .map(m => {
  //   m.choices.toString, m.hasOtherOption.valueOf.toString, m.helpText, 
  //   m.isRequired.valueOf.toString, m.questionType, m.title
  // });

}
