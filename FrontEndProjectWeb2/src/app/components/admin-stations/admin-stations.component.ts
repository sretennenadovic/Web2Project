import { Component, OnInit, NgZone } from '@angular/core';
import { GeoLocation } from 'src/app/models/map/geolocations';
import { MarkerInfo } from 'src/app/models/map/marker-info.model';
import { Polyline } from 'src/app/models/map/polyline';
import { Station } from 'src/app/models/station';
import { StationHttpService } from 'src/app/services/station/station.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-stations',
  templateUrl: './admin-stations.component.html',
  styleUrls: ['./admin-stations.component.css'],
  styles: ['agm-map {height: 450px; width: 650px;}']
})
export class AdminStationsComponent implements OnInit {

  newStationGL:GeoLocation;
  newStation:Station = new Station();
  markerInfo: MarkerInfo;
  public polyline: Polyline;
  public zoom: number;
  stations: Array<Station> = [];
  imageUrl:string = './assets/busicon.png'

  addStationForm = this.fb.group({
    name: ['', Validators.required],
    address: ['', Validators.required],
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
    this.newStation.Latitude = $event.coords.lat;
    this.newStation.Longitude = $event.coords.lng;
    this.newStationGL = new GeoLocation($event.coords.lat, $event.coords.lng);
  }

  addStation(){
    if(this.newStation.Latitude == undefined || this.newStation.Longitude == undefined
      || this.newStation == undefined){
        alert("Morate popuniti polja i oznaciti stanicu na mapi!")
      }else{
        this.newStation.Name = this.addStationForm.value.name
        this.newStation.Address = this.addStationForm.value.address
        this.stationsHttp.post(this.newStation).subscribe(data => {
          if(data){
            alert("Uspeno ste dodali stanicu!")
          }else{
            alert("Doslo je do greske!")
          }
        })
      }
  }
  changeStation(){
    this.router.navigate(['admin','changeStation'])
  }
  deleteStation(){
    this.router.navigate(['admin','deleteStation'])
  }
}
