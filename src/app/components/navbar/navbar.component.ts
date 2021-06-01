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

  constructor(
    public userService: UserService,
    public route: Router
  ) { }
  ngOnInit(): void {
  }

  getNameFromCookie() : void {
    let cookies = document.cookie
    .split(';')
    .map(c => c.split('='))
    .reduce((accumulator,[key,value]) => ({...accumulator, [key.trim()]: decodeURIComponent(value)}),{});
    console.log(cookies);
  }

  isLoggedIn(): boolean{
    return localStorage.getItem('token') != null;
  }

  isAdmin(): boolean{
    return true;
  }
}
