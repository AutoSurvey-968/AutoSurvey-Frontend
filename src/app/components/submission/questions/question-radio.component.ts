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
        <div class="question-group form-check form-check-inline" [formGroupName]="index">
        
          <!--id is formatted as question-index-choice-i, example: question-0-choice-0
              This is hard coded 1 through 5.-->
          <input type="radio" attr.name="{{'response'+index}}" formControlName="response{{index}}" id="{{'question-'+index+'-'+'choice-1'}}" value="1">
          <label for="{{'question-'+index+'-'+'choice-1'}}">1</label>
        </div>
        <div class="question-group form-check form-check-inline" [formGroupName]="index">
          <input type="radio" attr.name="{{'response'+index}}" formControlName="response{{index}}" id="{{'question-'+index+'-'+'choice-2'}}" value="2">
          <label for="{{'question-'+index+'-'+'choice-2'}}">2</label>
        </div>
        <div class="question-group form-check form-check-inline" [formGroupName]="index">
          <input type="radio" attr.name="{{'response'+index}}" formControlName="response{{index}}" id="{{'question-'+index+'-'+'choice-3'}}" value="3">
          <label for="{{'question-'+index+'-'+'choice-3'}}">3</label>
        </div>
        <div class="question-group form-check form-check-inline" [formGroupName]="index">
          <input type="radio" attr.name="{{'response'+index}}" formControlName="response{{index}}" id="{{'question-'+index+'-'+'choice-4'}}" value="4">
          <label for="{{'question-'+index+'-'+'choice-4'}}">4</label>
        </div>
        <div class="question-group form-check form-check-inline" [formGroupName]="index">
          <input type="radio" attr.name="{{'response'+index}}"  formControlName="response{{index}}" id="{{'question-'+index+'-'+'choice-5'}}" value="5">
          <label for="{{'question-'+index+'-'+'choice-5'}}">5</label>
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
