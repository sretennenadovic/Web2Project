import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-nav-bar',
  templateUrl: './admin-nav-bar.component.html',
  styleUrls: ['./admin-nav-bar.component.css']
})
export class AdminNavBarComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  schedule(){
    this.router.navigate(['admin','adminSchedule'])
  }

  catalog(){
    this.router.navigate(['admin','adminCatalog'])
  }

  stationLocation(){
    this.router.navigate(['admin','stations'])
  }

  lines(){
    this.router.navigate(['admin','lines'])
  }

  controllor(){
    this.router.navigate(['admin','addContr'])
  }

  requests(){
    this.router.navigate(['admin','validateProfile'])
  }

}
