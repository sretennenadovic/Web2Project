import { Component, OnInit, NgZone } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { StationHttpService } from 'src/app/services/station/station.service';
import { Router } from '@angular/router';
import { Station } from 'src/app/models/station';

@Component({
  selector: 'app-delete-station',
  templateUrl: './delete-station.component.html',
  styleUrls: ['./delete-station.component.css'],
  styles: ['agm-map {height: 450px; width: 650px;}']
})
export class DeleteStationComponent implements OnInit {

  Station:Station = new Station();
  public zoom: number;
  stations: Array<Station> = [];
  imageUrl:string = './assets/busicon.png'

  deleteStationForm = this.fb.group({
    name: ['', Validators.required],
    address: ['', Validators.required],
    latitude: ['',Validators.required],
    longitude: ['',Validators.required]
  });

  constructor(private ngZone: NgZone,
              private stationsHttp:StationHttpService,
              private fb:FormBuilder,
              private router:Router) { }

  ngOnInit() {
      this.stationsHttp.getAll().subscribe(data => {
        Object.assign(this.stations,data);
      })
  }

  selectedStation(station:Station){
    this.deleteStationForm.patchValue({'name': station.Name, 'address': station.Address,'latitude':station.Latitude,'longitude':station.Longitude})
    this.Station = station;
  }

  deleteStation(){
        this.stationsHttp.delete(this.Station.Id).subscribe(data => {
          if(data){
            alert("Uspeno ste dodali stanicu!")
          }else{
            alert("Doslo je do greske!")
          }
        })
      }
}
