import { Component, Input } from '@angular/core';
import { IQuestion } from 'src/app/models/iquestion.question';

@Component({
  selector: 'radio-question',
  template: `
    <p>{{ question.title }}<span style="color:red">*</span></p>
    <div class="d-flex justify-content-center" id="radioQuestion">
      <p style="margin-top: 9px; margin-right: 10px;">Not Satisfied</p>
      <div class="satisfactionQuestionGroup form-check form-check-inline">
        <input type="radio" name="satisfaction" id="sat1" value="1">
        <label for="sat1">1</label>
      </div>
      <div class="satisfactionQuestionGroup form-check form-check-inline">
        <input type="radio" name="satisfaction" id="sat2" value="2">
        <label for="sat2">2</label>
      </div>
      <div class="satisfactionQuestionGroup form-check form-check-inline">
        <input type="radio" name="satisfaction" id="sat3" value="3">
        <label for="sat3">3</label>
      </div>
      <div class="satisfactionQuestionGroup form-check form-check-inline">
        <input type="radio" name="satisfaction" id="sat4" value="4">
        <label for="sat4">4</label>
      </div>
      <div class="satisfactionQuestionGroup form-check form-check-inline">
        <input type="radio" name="satisfaction" id="sat5" value="5">
        <label for="sat5">5</label>
      </div>
      <p style="margin-top: 9px; margin-left: 10px;">Very Satisfied</p>
    </div>
  `,
})

export class RadioQuestionComponent {
  @Input() question!: IQuestion;
}
