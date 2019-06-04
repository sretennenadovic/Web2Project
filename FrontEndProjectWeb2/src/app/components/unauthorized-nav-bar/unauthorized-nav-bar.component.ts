import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unauthorized-nav-bar',
  templateUrl: './unauthorized-nav-bar.component.html',
  styleUrls: ['./unauthorized-nav-bar.component.css']
})
export class UnauthorizedNavBarComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  schedule(){
    this.router.navigate(['unauthorizedUser','schedule'])
  }

  lines(){
    this.router.navigate(['unauthorizedUser','lines'])
  }

  vehicleLocation(){
    this.router.navigate(['unauthorizedUser','vehicleLocations'])
  }

  catalog(){
    this.router.navigate(['unauthorizedUser','catalog'])
  }

  buyTicket(){
    this.router.navigate(['unauthorizedUser','buyOneTimeTicket'])
  }
}
