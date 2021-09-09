import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IQuestion } from 'src/app/models/iquestion-question';

@Component({
  selector: 'checkbox-question',
  template: `
    <br><hr><br>
    <div [formGroup]=form>
      <p>{{ question.title }}<span *ngIf="question.isRequired">*</span></p>
      <div formArrayName="responses">
        <div class="form-check" [formGroupName]="index" *ngFor="let choice of question.choices; index as i">
          
        <!--id is formatted as question-index-choice-i, example: question-0-choice-0
              Checkbox doesn't work properly. When submitting the form, the value is
              a boolean rather than an array of values. The next person will need to
              figure this out.-->
              
          <input type="checkbox" formControlName="response{{index}}" id="{{'question-'+index+'-'+'choice-'+i}}" value="{{choice}}">
          <label class="form-check-label" for="{{'question-'+index+'-'+'choice-'+i}}">{{choice}}</label>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['../submission.component.css']
})

export class CheckboxQuestionComponent {
  @Input() question!: IQuestion;
  @Input() index!: number;
  @Input() form!: FormGroup;
}
