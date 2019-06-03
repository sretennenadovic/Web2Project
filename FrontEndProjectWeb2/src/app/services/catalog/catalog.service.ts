import { BaseHttpService } from "../http/base-http.service";
import { Injectable } from "@angular/core";
import { CatalogInfo } from 'src/app/models/CatalogInfo';
import { TicketPrices } from 'src/app/models/TicketPrices';

@Injectable()
export class CatalogHttpService extends BaseHttpService<TicketPrices> {
  specificUrl = "/api/Catalogs/GetCatalogInfo";
}
