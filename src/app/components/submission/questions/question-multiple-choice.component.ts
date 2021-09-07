import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IQuestion } from 'src/app/models/iquestion-question';

@Component({
  selector: 'multiple-choice-question',
  template: `
    <br><hr><br>
    <div [formGroup]=form>
      <p>{{ question.title }}<span *ngIf="question.isRequired">*</span></p>
      <div formArrayName="responses">
        <div class="form-check" [formGroupName]="index" *ngFor="let choice of question.choices; index as i">
          
        <!--id is formatted as question-index-choice-i, example: question-0-choice-0
              There also needs to be a name, but it needs to match formControlName, so
              it gets messy when there are multiple radio questions. For now, you can
              select multiple radio buttons, but only the most recent will be stored in
              the form on submit. The next person will need to figure this out.-->
              
          <input type="radio" formControlName="response" id="{{'question-'+index+'-'+'choice-'+i}}" value="{{choice}}">
          <label class="form-check-label" for="{{'question-'+index+'-'+'choice-'+i}}">{{choice}}</label>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['../submission.component.css']
})

export class MultipleChoiceQuestionComponent {
  @Input() question!: IQuestion;
  @Input() index!: number;
  @Input() form!: FormGroup;
}
