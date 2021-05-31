import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  @Input() email!: string;
  @Input() firstName!: string;
  @Input() lastName!: string;

  constructor(private userService: UserService) {

  }

  ngOnInit(): void {
  }

  registerEmployee(): void {
      this.userService.register(this.firstName, this.lastName, this.email,  "").subscribe((data) => {
        console.log(data);
      })
  }
}
