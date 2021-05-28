import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { IQuestion } from 'src/app/models/iquestion.question';
import { environment } from 'src/environments/environment';
import { ISurvey } from '../../models/isurvey-survey';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  endpoint: string = environment.apiUrl+'/surveys';

  constructor(private http: HttpClient) { }

  getSurveys(): ISurvey[] {
    let surveys: ISurvey[] = [];

    // this.http.get(this.endpoint).pipe(
    //   map(response => response as string)
    // );
    return surveys;
  }

  getSurveyById(surveyId: string) {
    let survey: ISurvey = {
      uuid: '1',
      createdOn: '',
      title: '',
      description: '',
      confirmation: '',
      version: '',
      questions: [{
        questionType: 'MULTIPLE_CHOICE',
        title: 'title',
        helpText: 'help',
        isRequired: true,
        choices: ['a', 'b'],
        hasOtherOption: false
      }]

    }
    // return this.http.get(this.endpoint+'/'+surveyId).pipe(
    //   switchMap((survey) => {
    //     return <ISurvey>{
    //       uuid: survey.uuid,

    //     }
    //   })
    // )
    return survey;
  }
}
