import { Component, Input } from '@angular/core';
import { IQuestion } from 'src/app/models/iquestion-question';

@Component({
  selector: 'short-answer-question',
  template: `
    <br><hr><br>
    <div class="mb-3">
      <label for="{{'question-'+index+'-'+'form'}}" class="form-label">{{ question.title }}<span style="color:red" *ngIf="question.isRequired">*</span></label>
      <textarea class="form-control" id="{{'question-'+index+'-'+'form'}}" rows="3"></textarea>
    </div>
  `,
  styleUrls: ['./submission.component.css']
})

export class ShortAnswerQuestionComponent {
  @Input() question!: IQuestion;
  @Input() index!: number;
}
