import { Component, OnInit, NgZone } from '@angular/core';
import { Station } from 'src/app/models/station';
import { StationHttpService } from 'src/app/services/station/station.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Polyline } from 'src/app/models/map/polyline';
import { Line } from 'src/app/models/Line';
import { LineHttpService } from 'src/app/services/lines/line.service';
import { GeoLocation } from 'src/app/models/map/geolocations';

@Component({
  selector: 'app-lines',
  templateUrl: './lines.component.html',
  styleUrls: ['./lines.component.css'],
  styles: ['agm-map {height: 450px; width: 650px;}']
})
export class LinesComponent implements OnInit {

  stations: Array<Station> = [];
  lines: Array<Line> = [];
  sortedLines: Array<Line> = [];
  public polylines: Polyline[];
  polyline: Polyline = new Polyline([], 'blue', { url:"assets/busicon.png", scaledSize: {width: 50, height: 50}});
  imageUrl:string = './assets/busicon.png'
  selectedLine:Line = new Line();

  constructor(private ngZone: NgZone,
              private stationsHttp:StationHttpService,
              private lineHttp:LineHttpService,
              private fb:FormBuilder,
              private router:Router) { }

  ngOnInit() {
    this.stationsHttp.getAll().subscribe(data => {
      Object.assign(this.stations,data);
    })

    this.lineHttp.getAll().subscribe(data =>{
      Object.assign(this.lines,data);
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

    this.polylines = [];

    console.log(this.sortedLines)
  }

  changedLine(){
    for(let point of this.selectedLine.Stations){
      this.polyline.addLocation(new GeoLocation(point.Latitude,point.Longitude))
    }  
    this.polylines.push(this.polyline);
  }


}
