import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CatalogOneSpecificHttpService } from 'src/app/services/catalog/catalog.service';
import { CatalogInfo } from 'src/app/models/CatalogInfo';

@Component({
  selector: 'app-admin-catalog-view',
  templateUrl: './admin-catalog-view.component.html',
  styleUrls: ['./admin-catalog-view.component.css'],
  providers: [CatalogOneSpecificHttpService]
})
export class AdminCatalogViewComponent implements OnInit {

  id:number;
  values:CatalogInfo = new CatalogInfo();

  constructor(private _Activatedroute:ActivatedRoute,
              private getOneSpecificCatalog:CatalogOneSpecificHttpService,
              private router:Router) { }

  ngOnInit() {
    this.id=+this._Activatedroute.snapshot.paramMap.get("id");
    this.getOneSpecificCatalog.getById(this.id).subscribe(data=>{
      this.values = data;
    })
  }

  addCatalog(){
    this.router.navigate(['admin','adminAddCatalog']);
  }

}
