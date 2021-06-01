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

  getSurveyId(): string {
    return "/submit/"+0;
  }

  getDisable(): void {
    let urlList: string[] = ['/survey','/upload','/analytics','/sendemails','/submit'];
    let idList: string[] = ['survey','upload','analytics','sendemails','submission'];
    document.querySelectorAll('a').forEach(ni => {
      let urlID = this.route.url;
      if (this.route.url.substring(0,7) === '/submit'){
        urlID = this.route.url.substring(0,7);
      }
      for (let i = 0; i< urlList.length ; i++){ 
        if (urlID === urlList[i] && ni.id === idList[i]){
          ni.classList.remove('nav-link')
          ni.classList.add('nav-link', 'disabled')
          break;
        } 
        ni.className = 'nav-link';
      }
    });
  }

  isLoggedIn(): boolean{
    return localStorage.getItem('token') != null;
  }

  logoff(): void{
    localStorage.clear();
  }
}
