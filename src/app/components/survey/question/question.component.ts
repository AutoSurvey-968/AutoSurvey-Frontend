import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  @Output() removeSelf!: EventEmitter<number>;
  @Output() questionData!: EventEmitter<Object>;
  @Input() selectedType!: string;
  @Input() questionId!: number;
  questionForm: FormGroup;
  questionOptions: any = [
    { type: 'CHECKBOX' },
    { type: 'DROPDOWN' },
    { type: 'MULTIPLE_CHOICE' },
    { type: 'PARAGRAPH' },
    { type: 'RADIO' },
    { type: 'SHORT_ANSWER' },
  ]

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.questionForm = this.formBuilder.group({
      questionType: ['RADIO', [Validators.required]],
      title: ['', [Validators.required]],
      choices: this.formBuilder.array([]),
    });
    this.removeSelf = new EventEmitter();
  }

  ngOnInit(): void {
  }

  removeQuestion() {
    this.removeSelf.emit(this.questionId);
  }
}
