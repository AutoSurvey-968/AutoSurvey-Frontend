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
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getDisable();
  }

  getSurveyId(): string {
    return "/submit/"+0;
  }

  getDisable(): void {
    let urlList: string[] = ['/survey','/upload','/analytics','/sendemails','/submit', '/admin'];
    let idList: string[] = ['survey','upload','analytics','sendemails','submission', 'admin'];
    document.querySelectorAll('a').forEach(ni => {
      let urlID = this.router.url;
      if (this.router.url.substring(0,7) === '/submit'){
        urlID = this.router.url.substring(0,7);
      }
      for (let i = 0; i< urlList.length ; i++){
        if (urlID === urlList[i] && ni.id === idList[i] && ni.className === 'nav-link'){
          ni.classList.remove('nav-link')
          ni.classList.add('nav-link', 'disabled')
          break;
        }
        ni.className = 'nav-link';
      }
    });
  }

  logout() {
    this.getDisable();
    localStorage.setItem('token', '');
  }

  isLoggedIn(): boolean{
    return localStorage.getItem('token') != null && localStorage.getItem('token') != '';
  }

  checkNavbar(): boolean {
    if (/^\/submit(\/|$)/.test(this.router.url)) {
      return false;
    };
    if (/^\/confirmation(\/|$)/.test(this.router.url)) {
      return false;
    };
    return true;
  }
}
