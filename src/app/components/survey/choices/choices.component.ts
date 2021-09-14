import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators} from '@angular/forms';

@Component({
  selector: 'app-choices',
  templateUrl: './choices.component.html',
  styleUrls: ['./choices.component.css']
})
export class ChoicesComponent implements OnInit {
  @Input() choice!: string;
   choiceForm!: FormArray;
  @Input() choiceGroup!: FormGroup;
  @Output() choiceData: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();


  constructor(
    private formBuilder: FormBuilder
  ) {
    console.log(this.choiceForm);
    if (!this.choiceForm){
      this.choiceGroup = new FormGroup({
            response0: new FormControl(''),
            response1: new FormControl(''),
            response2: new FormControl(''),
            response3: new FormControl(''),
          })
          this.choiceForm = this.formBuilder.array([this.choiceGroup]);
    }
    
  }

  update(){
    this.choiceData.emit(this.choiceGroup);
  }

  ngOnInit(): void {}

}
