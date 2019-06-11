import { Injectable } from '@angular/core';
import { BaseHttpService } from '../http/base-http.service';

@Injectable()
export class TicketPostService extends BaseHttpService<any>{
    specificUrl = "/api/Tickets";
}

@Injectable()
export class OneTimeTicketService extends BaseHttpService<any>{
    specificUrl = "/api/Tickets/PostUnauthorizedTicket";
}

@Injectable()
export class TicketValidationHttpService extends BaseHttpService<any> {
  specificUrl = "/api/Tickets/GetTicketValidation";
}

@Injectable()
export class TicketTypeSrvice extends BaseHttpService<any>{
    specificUrl = "/api/TicketTypes";
}
