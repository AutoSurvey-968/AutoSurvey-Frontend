import { Component, Input } from '@angular/core';
import { IQuestion } from 'src/app/models/iquestion-question';

@Component({
  selector: 'radio-question',
  template: `
    <br><hr><br>
    <p>{{ question.title }}<span style="color:red" *ngIf="question.isRequired">*</span></p>
    <div class="d-flex justify-content-center">
      <!-- Need to see how we grab these labels from questions -->
      <p style="margin-top: 9px; margin-right: 10px;">Not Satisfied</p>
      <div class="question-group form-check form-check-inline" *ngFor="let choice of question.choices; index as i">
        <input type="radio" name="{{'question-'+index}}" id="{{'question-'+index+'-'+'choice-'+i}}" value="{{choice}}">
        <label for="{{'question-'+index+'-'+'choice-'+i}}">{{choice}}</label>
      </div>

      <p style="margin-top: 9px; margin-left: 10px;">Very Satisfied</p>
    </div>
  `,
  styleUrls: ['../submission.component.css']
})

export class RadioQuestionComponent {
  @Input() question!: IQuestion;
  @Input() index!: number;
}
