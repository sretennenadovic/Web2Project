import { TicketType } from './TicketType';
import { PassengerType } from './PassengerType';
import { TicketPrices } from './TicketPrices';

export class CatalogInfo {
    TicketTypes: TicketType[];
    PassengerTypes: PassengerType[];
    TicketPrices: TicketPrices[];
  }