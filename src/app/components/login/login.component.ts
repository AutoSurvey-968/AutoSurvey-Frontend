import { Component, Input, OnInit } from '@angular/core';
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

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  login(): void {
    this.userService.login(this.email, this.password).subscribe((data) => {
      console.log(document.cookie);
      localStorage.setItem("token", data.token);
    });
  }
}
