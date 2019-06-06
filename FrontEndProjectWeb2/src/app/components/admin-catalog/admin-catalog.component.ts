import { Component, OnInit } from '@angular/core';
import { CatalogInfo } from 'src/app/models/CatalogInfo';
import { CatalogHttpService, CatalogMainHttpService } from 'src/app/services/catalog/catalog.service';
import { Router } from '@angular/router';
import { Catalog } from 'src/app/models/Catalog';

@Component({
  selector: 'app-admin-catalog',
  templateUrl: './admin-catalog.component.html',
  styleUrls: ['./admin-catalog.component.css'],
  providers: [CatalogMainHttpService]
})
export class AdminCatalogComponent implements OnInit {

  constructor(private http: CatalogMainHttpService,
              private router: Router) { }

  values:Catalog[];

  ngOnInit() {
      this.http.getAll().subscribe(data =>{
        this.values = data;
      })
  }

  addCatalog(){
    this.router.navigate(['admin','adminAddCatalog']);
  }

  selectedCatalog(catalog:any){
    this.router.navigate(['admin','adminCatalogView',catalog.Id]);
  }
}
