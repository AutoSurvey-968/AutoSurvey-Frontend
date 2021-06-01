import { Component, Input } from '@angular/core';
import { IQuestion } from 'src/app/models/iquestion-question';

@Component({
  selector: 'multiple-choice-question',
  template: `
    <br><hr><br>
    <p>{{ question.title }}<span *ngIf="question.isRequired">*</span></p>
    <div class="form-check" *ngFor="let choice of question.choices; index as i">
      <input type="radio" name="{{'question-'+index}}" id="{{'question-'+index+'-'+'choice-'+i}}" value="{{choice}}"> <!-- Gotta figure out what to name each response-->
      <label class="form-check-label" for="{{'question-'+index+'-'+'choice-'+i}}">{{choice}}</label>
    </div>
  `,
  styleUrls: ['../submission.component.css']
})

export class MultipleChoiceQuestionComponent {
  @Input() question!: IQuestion;
  @Input() index!: number;
}
