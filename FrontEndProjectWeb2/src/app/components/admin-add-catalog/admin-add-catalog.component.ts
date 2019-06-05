import { Component, OnInit } from '@angular/core';
import { AdminCatalogInfo } from 'src/app/models/adminCatalogInfo';
import { CatalogAdminGetHttpService } from 'src/app/services/catalog/catalog.service';

@Component({
  selector: 'app-admin-add-catalog',
  templateUrl: './admin-add-catalog.component.html',
  styleUrls: ['./admin-add-catalog.component.css'],
  providers: [CatalogAdminGetHttpService]
})
export class AdminAddCatalogComponent implements OnInit {

  values:AdminCatalogInfo = new AdminCatalogInfo();
  novaCenaVremenska:number;
  novaCenaDnevna:number;
  novaCenaMesecna:number;
  novaCenaGodisnja:number;
  dateFrom:Date;
  dateTo:Date;

  constructor(private catalogAdminGetHttpService: CatalogAdminGetHttpService) { }

  ngOnInit() {
    this.catalogAdminGetHttpService.getSpecific().subscribe(data => {
      this.values = data;
    })
  }


}
