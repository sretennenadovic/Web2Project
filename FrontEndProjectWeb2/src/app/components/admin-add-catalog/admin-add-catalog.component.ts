import { Component, OnInit } from '@angular/core';
import { AdminCatalogInfo } from 'src/app/models/adminCatalogInfo';
import { CatalogAdminGetHttpService, CatalogPostOneHttpService } from 'src/app/services/catalog/catalog.service';
import { NewCatalog } from 'src/app/models/NewCatalog';

@Component({
  selector: 'app-admin-add-catalog',
  templateUrl: './admin-add-catalog.component.html',
  styleUrls: ['./admin-add-catalog.component.css'],
  providers: [CatalogAdminGetHttpService, CatalogPostOneHttpService]
})
export class AdminAddCatalogComponent implements OnInit {

  values:AdminCatalogInfo = new AdminCatalogInfo();
  newCatalog: NewCatalog = new NewCatalog();
  dateFrom:Date;

  constructor(private catalogAdminGetHttpService: CatalogAdminGetHttpService,
              private httpCatalog: CatalogPostOneHttpService) { }

  ngOnInit() {
    this.catalogAdminGetHttpService.getSpecific().subscribe(data => {
      this.values = data;
    })
  }

  addCatalog(values:any){
    let pom = true
    if(this.dateFrom != undefined){
      for(let price of values.CatalogHistory){
        if(typeof(price.TicketPrice) != "number"){
          pom = false; 
          alert("Morate uneti broj za cenu!")
        }
      }

      if(pom){
          console.log(values.CatalogHistory[0].TicketPrice)


          this.newCatalog.validFrom = this.dateFrom;
          this.newCatalog.TicketPrices = values.CatalogHistory;
          this.httpCatalog.post(this.newCatalog).subscribe(data => {
            if(data){
              alert("Uspesno ste dodali nov cenovnik!");
            }
          })
      }
    }else{
      alert("Odaberite datum od kada vazi ovaj Cenovnik!")
    }
  }
}
