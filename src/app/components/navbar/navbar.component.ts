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

  getDisable(): void {

    let urlList: string[] = ['/survey','/upload','/analytics','/sendemails'];
    let idList: string[] = ['survey','upload','analytics','sendemails'];
    let navItem = document.querySelectorAll('a');

    for (let i = 0; i<navItem.length;i++){
      for (let j = 0; j<i ; j++){
      console.log(this.route.url);
      console.log(navItem[i].id);
      console.log(navItem[i].className);
      if (this.route.url === urlList[j] && navItem[i].id === idList[j] && navItem[i].className === 'nav-link'){
        console.log("SUCCESS");
        navItem[i].classList.remove('nav-link')
        navItem[i].classList.add('nav-link', 'disabled')
        break;
      } 
      navItem[i].className = 'nav-link';
    }
    }
  }

  isLoggedIn(): boolean{
    return document.cookie != "";
  }
}
