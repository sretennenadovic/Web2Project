import { Component, OnInit } from '@angular/core';
import { TicketType } from 'src/app/models/TicketType';
import { TicketTypeSrvice, TicketPostService } from 'src/app/services/ticket/ticket.service';
import { Ticket } from 'src/app/models/Ticket';

@Component({
  selector: 'app-buy-tickets',
  templateUrl: './buy-tickets.component.html',
  styleUrls: ['./buy-tickets.component.css'],
  providers: [TicketTypeSrvice,TicketPostService]
})
export class BuyTicketsComponent implements OnInit {

  selectedTicketType:TicketType=new TicketType();
  TicketTypes : TicketType[] = [];
  ticket:Ticket = new Ticket();
  
  constructor(private httpGetAllTicketTypes:TicketTypeSrvice,
              private httpPostTicket:TicketPostService) { }

  ngOnInit() {
    this.httpGetAllTicketTypes.getAll().subscribe(data=>{
      this.TicketTypes = data;
    })
  }

  buy(){
    this.ticket.TicketTypeId = this.selectedTicketType.Id
    this.httpPostTicket.post(this.ticket).subscribe(data=>{
      if(data){
        alert("Uspesno ste kupili "+this.selectedTicketType.Name+" kartu!");
      }else{
        alert("Profil vam nije odobren, nemate mogucnost kupovine karata!");
      }
    })
  }
}
