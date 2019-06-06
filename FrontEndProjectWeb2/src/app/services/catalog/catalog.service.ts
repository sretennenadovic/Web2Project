import { BaseHttpService } from "../http/base-http.service";
import { Injectable } from "@angular/core";
import { CatalogInfo } from 'src/app/models/CatalogInfo';
import { AdminCatalogInfo } from 'src/app/models/adminCatalogInfo';
import { Catalog } from 'src/app/models/Catalog';
import { NewCatalog } from 'src/app/models/NewCatalog';

@Injectable()
export class CatalogHttpService extends BaseHttpService<CatalogInfo> {
  specificUrl = "/api/Catalogs/GetCatalogInfo";
}

@Injectable()
export class CatalogAdminGetHttpService extends BaseHttpService<AdminCatalogInfo> {
  specificUrl = "/api/Catalogs/GetAdminCatalogInfo";
}

@Injectable()
export class CatalogMainHttpService extends BaseHttpService<Catalog> {
  specificUrl = "/api/Catalogs";
}

@Injectable()
export class CatalogOneSpecificHttpService extends BaseHttpService<CatalogInfo> {
  specificUrl = "/api/Catalogs/GetSpecificOne";
}

@Injectable()
export class CatalogPostOneHttpService extends BaseHttpService<any> {
  specificUrl = "/api/Catalogs/PostNewOne";
}