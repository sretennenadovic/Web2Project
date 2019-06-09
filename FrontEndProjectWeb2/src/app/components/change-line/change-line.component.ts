import { Component, OnInit, NgZone } from '@angular/core';
import { Station } from 'src/app/models/station';
import { Line } from 'src/app/models/Line';
import { Polyline } from 'src/app/models/map/polyline';
import { StationHttpService } from 'src/app/services/station/station.service';
import { LineHttpService } from 'src/app/services/lines/line.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LineType } from 'src/app/models/LineType';
import { LineTypeHttpService } from 'src/app/services/linetypes/linetypes.service';
import { GeoLocation } from 'src/app/models/map/geolocations';

@Component({
  selector: 'app-change-line',
  templateUrl: './change-line.component.html',
  styleUrls: ['./change-line.component.css'],
  styles: ['agm-map {height: 450px; width: 650px;}']
})
export class ChangeLineComponent implements OnInit {

  stations: Array<Station> = [];
  lines: Array<Line> = [];
  sortedLines: Array<Line> = [];
  polyline: Polyline = new Polyline([], 'black', { url:"assets/busicon.png", scaledSize: {width: 50, height: 50}});
  imageUrl:string = './assets/busicon.png'
  selectedLine:Line = new Line();
  lineTypes : LineType[] = [];
  lineChanged:Line = new Line()

  changeLineForm = this.fb.group({
    name: ['', [Validators.required,Validators.maxLength(20)]],
    number: ['', Validators.required],
    type: ['',Validators.required]
  });

  constructor(private ngZone: NgZone,
    private stationsHttp:StationHttpService,
    private lineHttp:LineHttpService,
    private fb:FormBuilder,
    private router:Router,
    private linetypeHttp:LineTypeHttpService,) { }

  ngOnInit() {
    this.stationsHttp.getAll().subscribe(data => {
      Object.assign(this.stations,data);
    })

    this.lineHttp.getAll().subscribe(data =>{
      Object.assign(this.lines,data);
    })

    this.linetypeHttp.getAll().subscribe(data =>{
      this.lineTypes = data;
    })

    this.sortedLines = this.lines.sort((obj1, obj2) => {
      if (obj1.Name > obj2.Name) {
          return 1;
      } 
      if (obj1.Name < obj2.Name) {
          return -1;
      }
      return 0;
    });
  }

  changedLine(){
    let linetype = new LineType();
    for(let type of this.lineTypes){
      if(type.Id == this.selectedLine.LineTypeId){
        linetype = type;
      }
    }
    this.changeLineForm.patchValue({'name':this.selectedLine.Name,'number':this.selectedLine.Number,
                                    'type':linetype})

    this.polyline = new Polyline([], 'blue', { url:"assets/busicon.png", scaledSize: {width: 50, height: 50}});
    for(let point of this.selectedLine.Stations){
      this.polyline.addLocation(new GeoLocation(point.Latitude,point.Longitude))
    }  

    this.lineChanged.Stations = this.selectedLine.Stations
                                
    //prigradske su crvene
    if(this.selectedLine.LineTypeId == 2){
      this.polyline.color = "red";
    }else{
      this.polyline.color = "blue";
    }

  }

  changeStations(){
    this.polyline = new Polyline([], 'blue', { url:"assets/busicon.png", scaledSize: {width: 50, height: 50}});
    this.lineChanged.Stations = [];
  }

  selectedStation(station:Station){
    this.lineChanged.Stations.push(station);
    this.polyline.addLocation(new GeoLocation(station.Latitude, station.Longitude))
  }

  changeLine(){
    if(this.lineChanged.Stations.length >= 2){
      this.lineChanged.Name = this.changeLineForm.value.name;
      this.lineChanged.Number = this.changeLineForm.value.number;
      this.lineChanged.LineTypeId = this.changeLineForm.value.type.Id;
      this.lineChanged.Id = this.selectedLine.Id;
      console.log(this.lineChanged);
      this.lineHttp.put(this.lineChanged, this.selectedLine.Id).subscribe(data =>{
        if(data){
          alert("Uspesno ste izmenili liniju!")
        }else{
          alert("Doslo je do greske pri izmeni!")
        }
      })
    }else{
      alert("Liniju moraju ciniti minimum 2 stanice!")
    }
  }
}
