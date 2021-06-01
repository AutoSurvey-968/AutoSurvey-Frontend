import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IQuestion } from 'src/app/models/iquestion-question';

@Component({
  selector: 'multiple-choice-question',
  template: `
    <br><hr><br>
    <p>{{ question.title }}<span *ngIf="question.isRequired">*</span></p>
    <div class="form-check" *ngFor="let choice of question.choices; index as i">
      <!--id is formatted as question-index-choice-i, example: question-0-choice-0-->
      <input type="radio" name="{{'question-'+index}}" id="{{'question-'+index+'-'+'choice-'+i}}" value="{{choice}}">
      <label class="form-check-label" for="{{'question-'+index+'-'+'choice-'+i}}">{{choice}}</label>
    </div>
  `,
  styleUrls: ['../submission.component.css']
})

export class MultipleChoiceQuestionComponent {
  @Input() question!: IQuestion;
  @Input() index!: number;
  @Input() form!: FormGroup;
}
