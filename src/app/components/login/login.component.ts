import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ISurvey } from '../../models/isurvey-survey';
import { IUser } from '../../models/iuser-user';
import { SurveyService } from '../../services/survey/survey.service';
import { UserService } from '../../services/user/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input() email!: string;
  @Input() password!: string;

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Login'+environment.titleSuffix);
  }

  private openSnackbar(message: string) {
    this.snackBar.open(message, undefined, {duration: 2000});
  }

  login(): void {
    this.userService.login(this.email, this.password).subscribe(
      (data) => {
        localStorage.setItem('token', data.token);
        console.log(localStorage.getItem('token'));
        this.router.navigate(['analytics']);
      },
      (error: HttpErrorResponse) => {
        this.snackBar.open("Username or password was incorrect.", undefined, {duration: 2000 } );
        this.openSnackbar("Hello");
      });
  }
}
