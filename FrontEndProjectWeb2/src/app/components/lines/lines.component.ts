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
  role:string = localStorage.role;
  lineName:string=''
  lineNum:string=''
  lineType:string=''

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
  }

  changedLine(){
    this.polyline = new Polyline([], 'blue', { url:"assets/busicon.png", scaledSize: {width: 50, height: 50}});
    
    let splited = this.selectedLine.Order.split(',');
    let len = splited.length - 1
    let orderNum = [];
    for(let num = 0; num < len ;num++){
      let numberr = +splited[num]
      orderNum.push(numberr)
    }

    for(let ord of orderNum){
      for(let point of this.selectedLine.Stations){
        if(point.Id == ord){
          this.polyline.addLocation(new GeoLocation(point.Latitude,point.Longitude))
        }
      }  
    }
    //prigradske su crvene
    if(this.selectedLine.LineTypeId == 2){
      this.polyline.color = "red";
    }else{
      this.polyline.color = "blue";
    }

    this.lineName = this.selectedLine.Name;
    this.lineNum = this.selectedLine.Number.toString();
    this.lineType = this.selectedLine.LineTypeId == 1 ? "Gradska" : "Prigradska"
  }

  addLine(){
    this.router.navigate(['admin','addLine']);
  }

  changeLine(){
    this.router.navigate(['admin','changeLine']);
  }

  deleteLine(){
    this.router.navigate(['admin','deleteLine']);
  }
}
