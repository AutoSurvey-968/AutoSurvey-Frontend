import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-searchresults',
  templateUrl: './searchresults.component.html',
  styleUrls: ['./searchresults.component.css']
})
export class SearchresultsComponent implements OnInit {
  @Input()
  itemId!: number;
  @Output()
  editRequest: EventEmitter<Number> = new EventEmitter<Number>();
  deleteRequest: EventEmitter<Number> = new EventEmitter<Number>();
  

  constructor() { }

  ngOnInit(): void {
  }

  editReq() {  
    this.editRequest.emit(this.itemId);

  }

  deleteReq() {
    this.deleteRequest.emit(this.itemId);

  }



}
