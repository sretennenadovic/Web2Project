import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-controlor-nav-bar',
  templateUrl: './controlor-nav-bar.component.html',
  styleUrls: ['./controlor-nav-bar.component.css']
})
export class ControlorNavBarComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  ticketValidation(){
    this.router.navigate(['controllor','validation'])
  }

  requests(){
    this.router.navigate(['controllor','validateProfile'])
  }

}
