import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IQuestion } from 'src/app/models/iquestion-question';

@Component({
  selector: 'radio-question',
  template: `
    <br><hr><br>
    <div [formGroup]=form>
      <p>{{ question.title }}<span style="color:red" *ngIf="question.isRequired">*</span></p>
      <div class="d-flex justify-content-center" formArrayName="responses">
        <!-- Need to see how we grab these labels from questions -->
        <p style="margin-top: 9px; margin-right: 10px;">Not Satisfied</p>
        <div class="question-group form-check form-check-inline" [formGroupName]="index" *ngFor="let choice of question.choices; index as i">
          <!--id is formatted as question-index-choice-i, example: question-0-choice-0
              There also needs to be a name, but it needs to match formControlName, so
              it gets messy when there are multiple radio questions. For now, you can
              select multiple radio buttons, but only the most recent will be stored in
              the form on submit. The next person will need to figure this out.-->
          <input type="radio" formControlName="response" id="{{'question-'+index+'-'+'choice-'+i}}" value="{{choice}}">
          <label for="{{'question-'+index+'-'+'choice-'+i}}">{{choice}}</label>
        </div>

        <p style="margin-top: 9px; margin-left: 10px;">Very Satisfied</p>
      </div>
    </div>
  `,
  styleUrls: ['../submission.component.css']
})

export class RadioQuestionComponent {
  @Input() question!: IQuestion;
  @Input() index!: number;
  @Input() form!: FormGroup;
}
