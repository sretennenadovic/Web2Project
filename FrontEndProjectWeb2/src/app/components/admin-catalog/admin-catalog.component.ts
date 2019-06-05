import { Component, OnInit } from '@angular/core';
import { CatalogInfo } from 'src/app/models/CatalogInfo';
import { CatalogHttpService } from 'src/app/services/catalog/catalog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-catalog',
  templateUrl: './admin-catalog.component.html',
  styleUrls: ['./admin-catalog.component.css']
})
export class AdminCatalogComponent implements OnInit {

  constructor(private http: CatalogHttpService,
              private router: Router) { }

  values:CatalogInfo = new CatalogInfo();

  ngOnInit() {
    this.http.getSpecific().subscribe(
      values => {
        (this.values = values)
          console.log(values);
      },
      err => console.log(err)
    );
  }

  dodajCenovnik(){
    this.router.navigate(['admin','adminAddCatalog']);
  }

  izmeniCenovnik(){
    this.router.navigate(['admin','adminChangeCatalog']);
  }
}
