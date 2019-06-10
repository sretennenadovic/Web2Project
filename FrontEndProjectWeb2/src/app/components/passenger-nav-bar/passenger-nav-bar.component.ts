import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-passenger-nav-bar',
  templateUrl: './passenger-nav-bar.component.html',
  styleUrls: ['./passenger-nav-bar.component.css']
})
export class PassengerNavBarComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  schedule(){
    this.router.navigate(['passenger','schedule'])
  }

  lines(){
    this.router.navigate(['passenger','lines'])
  }

  vehicleLocation(){
    this.router.navigate(['passenger','vehicleLocations'])
  }

  catalog(){
    this.router.navigate(['passenger','catalog'])
  }

}
