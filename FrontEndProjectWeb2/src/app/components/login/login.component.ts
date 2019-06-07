import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  message: string;

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });
  
  constructor(public authService: AuthService, public router: Router, private fb: FormBuilder) {
    this.setMessage();
  }

  setMessage() {
    this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  }

  ngOnInit() {
  }

  moveToRegisterComponent(){
    this.router.navigate(['unauthorizedUser','register'])
  }

  login() {
    this.authService.login(this.loginForm.value).subscribe((data) => {
      if(data === 'admin'){
        this.router.navigate(['admin'])
      }else if(data === 'kontrolor'){
        this.router.navigate(['controllor'])
      }else if(data === 'putnik'){
        this.router.navigate(['passenger'])
      }else if(data === 'greska'){
        alert("Nevalidni username ili password");
      }
      
    });
  }

  logout() {
    this.authService.logout();
    this.setMessage();
  }

}
