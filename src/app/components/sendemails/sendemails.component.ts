import { Component, OnInit } from '@angular/core';
import {Batch} from '../../models/batch';
import {CaliburService} from '../../services/caliber/calibur.service';

@Component({
  selector: 'app-sendemails',
  templateUrl: './sendemails.component.html',
  styleUrls: ['./sendemails.component.css']
})

export class SendemailsComponent implements OnInit {

  public batches!: Batch[];
  constructor(private calivurService: CaliburService) { }

  ngOnInit(): void {
  }

  getAllBatches(): void{
    this.calivurService.getAllBatches()
    .subscribe(data => {this.batches = data});
  }
}
