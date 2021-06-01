import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IQuestion } from 'src/app/models/iquestion-question';

@Component({
  selector: 'short-answer-question',
  template: `
    <br><hr><br>
    <div class="mb-3">
      <label for="{{'question-'+index+'-'+'form'}}" class="form-label">{{ question.title }}<span *ngIf="question.isRequired">*</span></label>
      <!--id is formatted as question-index-choice-i, example: question-0-choice-0-->
      <textarea class="form-control" id="{{'question-'+index+'-'+'form'}}" rows="3" formControlName="response"></textarea>
    </div>
  `,
  styleUrls: ['../submission.component.css']
})

export class ShortAnswerQuestionComponent {
  @Input() question!: IQuestion;
  @Input() index!: number;
  @Input() form!: FormGroup;
}
