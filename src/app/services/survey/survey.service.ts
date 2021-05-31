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
    console.log(surveyId);
    return {
      uuid: '1',
      createdOn: '',
      title: 'Hello people?',
      description: '',
      confirmation: '',
      version: '',
      questions: [{
        questionType: 'MULTIPLE_CHOICE',
        title: 'hello, how are you today',
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
  }
}
