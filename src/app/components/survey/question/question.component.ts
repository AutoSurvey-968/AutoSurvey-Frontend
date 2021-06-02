import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-question',
  template: `

  `,
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  @Input() index!: number;
  @Input() question!: AbstractControl;

  typeOptions = [
    'DROPDOWN',
    'MULTIPLE_CHOICE',
    'RADIO',
  ];

  ngOnInit() {

  }

  selectionChange(event: MatSelectChange) {

  }

  removeQuestion() {

  }
}
