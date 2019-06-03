import { BaseHttpService } from "../http/base-http.service";
import { Injectable } from "@angular/core";
import { CatalogInfo } from 'src/app/models/CatalogInfo';

@Injectable()
export class CatalogHttpService extends BaseHttpService<CatalogInfo> {
  specificUrl = "/api/Catalogs/GetCatalogInfo";
}
