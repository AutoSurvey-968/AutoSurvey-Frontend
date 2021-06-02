import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  registerEmployee(): void {
      this.userService.register(this.firstName, this.lastName, this.email,  "").subscribe((data) => {
        this.openSnackbar("User added.");
      },
      (error : HttpErrorResponse) => {
        if (error.status === 400) {
          this.openSnackbar("Invalid email.");
        } else if (error.status === 409) {
          this.openSnackbar("Email is in use.");
        } else {
          this.openSnackbar("Server error, please try again later.");
        }
      })
  }

  private openSnackbar(message : string) {
    this.snackBar.open(message, undefined, {duration: 2000});
  }
}
