import { Component, OnInit } from '@angular/core';
import { CatalogHttpService } from 'src/app/services/catalog/catalog.service';
import { CatalogInfo } from 'src/app/models/CatalogInfo';
import { TicketType } from 'src/app/models/TicketType';
import { PassengerType } from 'src/app/models/PassengerType';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  values:CatalogInfo;
  selectedTicketType:TicketType = new TicketType();
  selectedPassengerType:PassengerType = new PassengerType();

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
