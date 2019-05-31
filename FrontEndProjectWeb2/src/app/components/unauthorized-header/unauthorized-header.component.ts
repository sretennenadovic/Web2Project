import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unauthorized-header',
  templateUrl: './unauthorized-header.component.html',
  styleUrls: ['./unauthorized-header.component.css']
})
export class UnauthorizedHeaderComponent implements OnInit {

  constructor(private router: Router) 
  {
    
  }

  ngOnInit() {
  }

  moveToLoginInComponent(){
    this.router.navigate(['unauthorizedUser','login'])
  }
}
