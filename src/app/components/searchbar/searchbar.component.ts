import { Component, OnInit } from '@angular/core';
import { SurveyService } from 'src/app/services/survey/survey.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css'],
})
export class SearchbarComponent implements OnInit {
  public searchInput: String = '';
  public searchResult: String = '';

  constructor(
    public surveyService: SurveyService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    // this.surveyService
    //   .getSurveyByTitle(this.searchInput)
    //   .subscribe((data) => this.searchResult);
  }

  search(): void {
    if (this.searchInput) {
      //this.router.navigateByUrl('/search/' + this.searchInput);
      this.surveyService.getSurveyByTitle(this.searchInput).subscribe((data) => this.searchResult);
      console.log(this.searchResult);
    }
  }
}
