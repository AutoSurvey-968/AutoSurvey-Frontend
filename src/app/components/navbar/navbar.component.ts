import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  constructor(public userService: UserService, public route: Router) { }
  private isTest: boolean = false;
  ngOnInit(): void {
  }

  getSurveyId(): string {
    return "/submit/"+0;
  }

  isLoggedIn(): boolean{
    return document.cookie != "";
  }
}
