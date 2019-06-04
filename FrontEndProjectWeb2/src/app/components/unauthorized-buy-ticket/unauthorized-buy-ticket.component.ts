import { Component, OnInit } from '@angular/core';
import { OneTimeTicketService } from 'src/app/services/ticket/ticket.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Ticket } from 'src/app/models/Ticket';
import { TicketUnauthorized } from 'src/app/models/TicketUnauthorized';

@Component({
  selector: 'app-unauthorized-buy-ticket',
  templateUrl: './unauthorized-buy-ticket.component.html',
  styleUrls: ['./unauthorized-buy-ticket.component.css'],
  providers: [OneTimeTicketService]
})
export class UnauthorizedBuyTicketComponent implements OnInit {

  public buyOneTimeTicketForm = this.fb.group({
    mail: ['', Validators.required]
  });

  constructor(private buyOneTimeTIcketService: OneTimeTicketService, private fb: FormBuilder) { }

  ngOnInit() {
  }

  buyOneTimeTicket(){
    this.buyOneTimeTIcketService.postOneTimeTicket(this.buyOneTimeTicketForm.value).subscribe((data) => {
      alert("Uspesno ste kupili kartu u "+(data as Date)+", i vazi u narednih sat vremena!");
    }), err=>console.log(err);
  }

}
