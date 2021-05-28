import { Component, OnInit } from '@angular/core';
import {MatSelectModule} from '@angular/material/select'; 
import {Batch} from './batch';
import {CaliburService} from './calibur.service';

@Component({
  selector: 'app-sendemails',
  templateUrl: './sendemails.component.html',
  styleUrls: ['./sendemails.component.css']
})

export class SendemailsComponent implements OnInit {

  public batches?: Batch[];
  constructor() { }

  ngOnInit(): void {
  }

}
