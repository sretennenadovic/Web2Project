import { Component, OnInit } from '@angular/core';
import { CatalogHttpService } from 'src/app/services/catalog/catalog.service';
import { TicketType } from 'src/app/models/TicketType';
import { PassengerType } from 'src/app/models/PassengerType';
import { TicketPrices } from 'src/app/models/TicketPrices';
import { CatalogInfo } from 'src/app/models/CatalogInfo';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  values:CatalogInfo = new CatalogInfo();

  constructor(private http: CatalogHttpService) { }

  ngOnInit() {
    this.http.getSpecific().subscribe(
      values => {
        (this.values = values)
          console.log(values);
      },
      err => console.log(err)
    );
  }

}
