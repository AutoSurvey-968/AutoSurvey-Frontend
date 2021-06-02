import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-choices',
  templateUrl: './choices.component.html',
  styleUrls: ['./choices.component.css']
})
export class ChoicesComponent implements OnInit {
  @Input() choice!: string;
  choiceForm!: FormArray;
  @Output() choiceData!: EventEmitter<FormArray>;


  constructor(
    private formBuilder: FormBuilder
  ) {
    this.choiceForm = this.formBuilder.array([]);;
  }

  ngOnInit(): void {}

}
