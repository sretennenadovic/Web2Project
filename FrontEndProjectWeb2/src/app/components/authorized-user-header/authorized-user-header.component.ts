import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authorized-user-header',
  templateUrl: './authorized-user-header.component.html',
  styleUrls: ['./authorized-user-header.component.css']
})
export class AuthorizedUserHeaderComponent implements OnInit {

  constructor(private httpLogOut: AuthService, private router: Router) { }

  ngOnInit() {
  }

  LogOut(){
    this.httpLogOut.logout();
    this.router.navigate(['unauthorizedUser','login'])
  }

  profile(){
    if(localStorage.role==='Admin'){
      this.router.navigate(['admin','profile'])
    }else if(localStorage.role==='Controller'){
      this.router.navigate(['controllor','profile'])
    }else if(localStorage.role==='AppUser'){
      this.router.navigate(['passenger','profile'])
    }
  }
}
