import { Component, OnInit, NgZone } from '@angular/core';
import { Station } from 'src/app/models/station';
import { GeoLocation } from 'src/app/models/map/geolocations';
import { MarkerInfo } from 'src/app/models/map/marker-info.model';
import { Polyline } from 'src/app/models/map/polyline';
import { Validators, FormBuilder } from '@angular/forms';
import { StationHttpService } from 'src/app/services/station/station.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-change-station',
  templateUrl: './change-station.component.html',
  styleUrls: ['./change-station.component.css'],
  styles: ['agm-map {height: 450px; width: 650px;}']
})
export class ChangeStationComponent implements OnInit {

  newStationGL:GeoLocation;
  Station:Station = new Station();
  markerInfo: MarkerInfo;
  public polyline: Polyline;
  public zoom: number;
  stations: Array<Station> = [];
  imageUrl:string = './assets/busicon.png'

  changeStationForm = this.fb.group({
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

  placeMarker($event){
    this.Station.Latitude = $event.coords.lat;
    this.Station.Longitude = $event.coords.lng;
    this.changeStationForm.patchValue({'latitude':$event.coords.lat,'longitude':$event.coords.lng})
  }

  selectedStation(station:Station){
    this.changeStationForm.patchValue({'name': station.Name, 'address': station.Address,'latitude':station.Latitude,'longitude':station.Longitude})
    this.Station = station;
  }

  changeStation(){
    this.Station.Name = this.changeStationForm.value.name;
    this.Station.Address = this.changeStationForm.value.address;
    this.Station.Latitude = this.changeStationForm.value.latitude;
    this.Station.Longitude = this.changeStationForm.value.longitude;

    this.stationsHttp.put(this.Station, this.Station.Id).subscribe(data =>{
      if(data){
        alert("Uspesno ste izmenili stanicu!");
      }else{
        alert("Doslo je do greske pri izmeni!")
      }
    }
    ,err=> alert(err.error.Message))
  }

 
}
