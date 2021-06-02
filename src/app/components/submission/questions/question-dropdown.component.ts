import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IQuestion } from 'src/app/models/iquestion-question';

@Component({
  selector: 'dropdown-question',
  template: `
    <br><hr><br>
    <div [formGroup]=form>
      <div formArrayName="responses">
        <div [formGroupName]="index">
          <label class="form-label" for="{{'question-'+index+'-dropdown'}">{{question.title}}<span *ngIf="question.isRequired">*</span></label>
          <select class="form-control" id="{{'question-'+index+'-dropdown'}" formControlName="response" required>
            <!--id is formatted as question-index-choice-i, example: question-0-choice-0-->
            <option *ngFor="let choice of question.choices; index as i" id="{{'question-'+index+'-'+'choice-'+i}}"  value="{{choice}}">{{choice}}</option>
          </select>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['../submission.component.css']
})

export class DropdownQuestionComponent {
  @Input() question!: IQuestion;
  @Input() index!: number;
  @Input() form!: FormGroup;
}
