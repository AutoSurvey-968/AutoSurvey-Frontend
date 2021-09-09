import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-choices',
  templateUrl: './choices.component.html',
  styleUrls: ['./choices.component.css']
})
export class ChoicesComponent implements OnInit {
  @Input() choice!: string;
  choiceForm!: FormArray;
  choiceGroup!: FormGroup;
  @Output() choiceData!: EventEmitter<FormArray>;


  constructor(
    private formBuilder: FormBuilder
  ) {
    this.choiceForm = this.formBuilder.array([]);
    this.choiceGroup = new FormGroup({
      response0: new FormControl(),
      response1: new FormControl(),
      response2: new FormControl(),
      response3: new FormControl(),
    })
  }

  ngOnInit(): void {}

}
