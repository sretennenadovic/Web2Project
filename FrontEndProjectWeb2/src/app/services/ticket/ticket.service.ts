import { Injectable } from '@angular/core';
import { BaseHttpService } from '../http/base-http.service';

@Injectable()
export class TicketPostService extends BaseHttpService<any>{
    specificUrl = "/api/Tickets";
}

@Injectable()
export class OneTimeTicketService extends BaseHttpService<any>{
    specificUrl = "/api/Tickets/UnauthorizedTicket";
}
