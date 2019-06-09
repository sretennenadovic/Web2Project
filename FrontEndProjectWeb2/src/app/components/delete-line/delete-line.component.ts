import { Component, OnInit, NgZone } from '@angular/core';
import { Station } from 'src/app/models/station';
import { Line } from 'src/app/models/Line';
import { Polyline } from 'src/app/models/map/polyline';
import { StationHttpService } from 'src/app/services/station/station.service';
import { LineHttpService } from 'src/app/services/lines/line.service';
import { GeoLocation } from 'src/app/models/map/geolocations';

@Component({
  selector: 'app-delete-line',
  templateUrl: './delete-line.component.html',
  styleUrls: ['./delete-line.component.css'],
  styles: ['agm-map {height: 450px; width: 650px;}']
})
export class DeleteLineComponent implements OnInit {

  stations: Array<Station> = [];
  lines: Array<Line> = [];
  sortedLines: Array<Line> = [];
  polyline: Polyline = new Polyline([], 'black', { url:"assets/busicon.png", scaledSize: {width: 50, height: 50}});
  imageUrl:string = './assets/busicon.png'
  selectedLine:Line = new Line();

  constructor(private ngZone: NgZone,
    private stationsHttp:StationHttpService,
    private lineHttp:LineHttpService) { }

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
  }

  changedLine(){
    let splited = this.selectedLine.Order.split(',');
    let len = splited.length - 1
    let orderNum = [];
    for(let num = 0; num < len ;num++){
      let numberr = +splited[num]
      orderNum.push(numberr)
    }

    this.polyline = new Polyline([], 'blue', { url:"assets/busicon.png", scaledSize: {width: 50, height: 50}});
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
  }

  deleteLine(){
    this.lineHttp.delete(this.selectedLine.Id).subscribe(data => {
        if(data){
          alert('Uspesno ste obrisali liniju '+this.selectedLine.Name)
        }else{
          alert('Doslo je do greske pri brisanju!');
        }
    })
  }

}
