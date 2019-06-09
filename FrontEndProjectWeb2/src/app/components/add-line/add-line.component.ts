import { Component, OnInit, NgZone } from '@angular/core';
import { Station } from 'src/app/models/station';
import { Polyline } from 'src/app/models/map/polyline';
import { Router } from '@angular/router';
import { StationHttpService } from 'src/app/services/station/station.service';
import { GeoLocation } from 'src/app/models/map/geolocations';
import { Line } from 'src/app/models/Line';
import { LineType } from 'src/app/models/LineType';
import { LineTypeHttpService } from 'src/app/services/linetypes/linetypes.service';
import { Validators, FormBuilder, MaxLengthValidator } from '@angular/forms';
import { LineHttpService } from 'src/app/services/lines/line.service';

@Component({
  selector: 'app-add-line',
  templateUrl: './add-line.component.html',
  styleUrls: ['./add-line.component.css'],
  styles: ['agm-map {height: 450px; width: 650px;}']
})
export class AddLineComponent implements OnInit {
  stations: Array<Station> = [];
  polyline: Polyline = new Polyline([], 'black', { url:"assets/busicon.png", scaledSize: {width: 50, height: 50}});
  imageUrl:string = './assets/busicon.png'
  newLine : Line = new Line();
  lineTypes : LineType[] = [];
  selectedLineType:LineType = new LineType();
  lineName:string;
  lineNumber:number;

  addLineForm = this.fb.group({
    name: ['', [Validators.required,Validators.maxLength(20)]],
    number: ['', Validators.required],
    type: ['',Validators.required]
  });
  
  constructor(private ngZone: NgZone,
    private stationsHttp:StationHttpService,
    private router:Router,
    private linetypeHttp:LineTypeHttpService,
    private fb:FormBuilder,
    private lineHttp: LineHttpService) { }

  ngOnInit() {
    this.stationsHttp.getAll().subscribe(data => {
      Object.assign(this.stations,data);
    })

    this.linetypeHttp.getAll().subscribe(data =>{
      this.lineTypes = data;
    })

    this.newLine.Stations = [];
    this.newLine.Order = '';
  }

  selectedStation(station:Station){
    this.newLine.Stations.push(station);
    this.newLine.Order += station.Id + ',';
    this.polyline.addLocation(new GeoLocation(station.Latitude, station.Longitude))
    console.log(this.polyline)
  }

  addLine(){
    if(this.newLine.Stations.length >= 2){
      this.newLine.LineTypeId = this.addLineForm.value.type.Id;
      this.newLine.Name = this.addLineForm.value.name;
      this.newLine.Number = this.addLineForm.value.number;
      this.lineHttp.post(this.newLine).subscribe(data => {
        if(data){
          alert("Uspeno ste dodali novu liniju!");
        }else{
          alert("Doslo je do greske pri dodavanju!");
        }
      })
    }else{
      alert("Liniju moraju ciniti minimum 2 stanice!")
    }
  }
}
