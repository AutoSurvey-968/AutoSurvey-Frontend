import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-choices',
  templateUrl: './choices.component.html',
  styleUrls: ['./choices.component.css']
})
export class ChoicesComponent implements OnInit {
  @Input() choice!: string;
  @Input() choiceForm!: FormArray;
  choiceGroup!: FormGroup;
  @Output() choiceData: EventEmitter<FormArray> = new EventEmitter<FormArray>();


  constructor(
    private formBuilder: FormBuilder
  ) {
    this.choiceGroup = new FormGroup({
      response0: new FormControl('', Validators.required),
      response1: new FormControl('', Validators.required),
      response2: new FormControl('', Validators.required),
      response3: new FormControl('', Validators.required),
    })
    this.choiceForm = this.formBuilder.array([this.choiceGroup]);
  }

  update(){
    this.choiceData.emit(this.choiceForm);
  }

  ngOnInit(): void {}

}
