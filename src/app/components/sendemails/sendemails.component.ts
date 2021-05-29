import { Component, OnInit } from '@angular/core';
import {Batch} from '../../models/Caliber/batch';
import { Employee } from '../../models/Caliber/employee';
import {CaliberService} from '../../services/caliber/caliber.service';

@Component({
  selector: 'app-sendemails',
  templateUrl: './sendemails.component.html',
  styleUrls: ['./sendemails.component.css']
})

export class SendemailsComponent implements OnInit {

  public batches!: Batch[];
  public leadTrainers!: Employee[];
  constructor(private caliberService: CaliberService) { }

  ngOnInit(): void {
    this.getAllBatches();
  }

  getAllBatches(): void{
    this.caliberService.getAllBatches()
    .subscribe(data => {this.batches = data;
    });
  }
}
