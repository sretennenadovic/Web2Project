import { BaseHttpService } from "../http/base-http.service";
import { Injectable } from "@angular/core";
import { CatalogInfo } from 'src/app/models/CatalogInfo';
import { AdminCatalogInfo } from 'src/app/models/adminCatalogInfo';

@Injectable()
export class CatalogHttpService extends BaseHttpService<CatalogInfo> {
  specificUrl = "/api/Catalogs/GetCatalogInfo";
}

@Injectable()
export class CatalogAdminGetHttpService extends BaseHttpService<AdminCatalogInfo> {
  specificUrl = "/api/Catalogs/GetAdminCatalogInfo";
}
