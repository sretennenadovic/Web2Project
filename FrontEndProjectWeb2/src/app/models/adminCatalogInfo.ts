import { Catalog } from './Catalog';
import { TicketType } from './TicketType';
import { CatalogHistory } from './CatalogHistory';

export class AdminCatalogInfo{
    Catalog:Catalog;
    TicketTypes:TicketType[];
    CatalogHistory:CatalogHistory[];
}