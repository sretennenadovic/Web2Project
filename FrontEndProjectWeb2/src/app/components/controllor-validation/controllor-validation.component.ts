import { Component, OnInit } from '@angular/core';
import { TicketValidationHttpService } from 'src/app/services/ticket/ticket.service';
import { errorHandler } from '@angular/platform-browser/src/browser';

@Component({
  selector: 'app-controllor-validation',
  templateUrl: './controllor-validation.component.html',
  styleUrls: ['./controllor-validation.component.css'],
  providers: [TicketValidationHttpService]
})
export class ControllorValidationComponent implements OnInit {

  result:string = '';
  inputedId:number;

  constructor(private checkValidation:TicketValidationHttpService) { }

  ngOnInit() {
  }

  checkIfItsValid(){
    this.result = ''
    this.checkValidation.getById(this.inputedId).subscribe(data => {
      if(data){
        this.result ="Karta ID:"+this.inputedId+" je vazeca!"
      }else if(!data){
        this.result = "Karta ID:"+this.inputedId+" je istekla ili ne postoji!"
      }
    }),
    err => console.log(err);
      //this.result = "Karta sa ID: "+this.inputedId+" ne postoji!"
    
  }
}
