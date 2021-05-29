import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  @Input() email!: string;
  @Input() password!: string;

  constructor() { 

  }

  ngOnInit(): void {
  }

  registerEmployee(): void {
      console.log();
  }
}
