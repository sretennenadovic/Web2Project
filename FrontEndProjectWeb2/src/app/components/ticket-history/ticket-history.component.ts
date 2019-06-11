import { Component, OnInit } from '@angular/core';
import { TicketHistory } from 'src/app/models/ticketHistory';
import { TicketHistorySrvice, TicketHistoryPriceSrvice } from 'src/app/services/ticket/ticket.service';
import { Ticket } from 'src/app/models/Ticket';

@Component({
  selector: 'app-ticket-history',
  templateUrl: './ticket-history.component.html',
  styleUrls: ['./ticket-history.component.css'],
  providers: [TicketHistorySrvice,TicketHistoryPriceSrvice]
})
export class TicketHistoryComponent implements OnInit {

  ticketHistory:TicketHistory = new TicketHistory();
  ticketPrice:number;
  selectedTicketId:number;

  constructor(private ticketHistoryService:TicketHistorySrvice,
              private ticketHistoryPriceService:TicketHistoryPriceSrvice) { }

  ngOnInit() {
    this.ticketHistoryService.getSpecific().subscribe(data=>{
      this.ticketHistory = data

      
    for(let ticket of this.ticketHistory.Tickets){
      for(let ticketType of this.ticketHistory.TicketTypes){
        if(ticket.TicketTypeId == ticketType.Id){
          ticket.TicketType = ticketType
        }
      }
    }
    })

  }

  selectTicket(ticket:Ticket){
    this.ticketHistoryPriceService.getTicketPrice(ticket.CatalogHistoryId,ticket.TicketTypeId).subscribe(data=>{
      this.ticketPrice = data;
      this.selectedTicketId = ticket.Id
    })
  }

}
