import { Component, OnInit } from '@angular/core';
import { ScheduleInfo } from 'src/app/models/scheduleInfo';
import { ScheduleType } from 'src/app/models/ScheduleType';
import { LineType } from 'src/app/models/LineType';
import { ScheduleHttpService, ScheduleLineHttpService } from 'src/app/services/schedule/schedule.service';
import { Line } from 'src/app/models/Line';
import { Schedule } from 'src/app/models/Schedule';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-schedule',
  templateUrl: './admin-schedule.component.html',
  styleUrls: ['./admin-schedule.component.css']
})
export class AdminScheduleComponent implements OnInit {

  values: ScheduleInfo = new ScheduleInfo();
  selectedScheduleType:ScheduleType = new ScheduleType();
  selectedLineType:LineType = new LineType();
  selectedL:Line = new Line();
  schedule: Schedule = new Schedule();

  constructor(private http: ScheduleHttpService, private sheduleLineService:ScheduleLineHttpService,private router:Router) { }

  ngOnInit() {
    this.http.getSpecific().subscribe(
      values => {
        (this.values = values)
          console.log(values);
      },
      err => console.log(err)
    );
  }

  changeOfLineType(){
    this.selectedL = undefined;
  }

  changeOfLine(){
    if(this.selectedL == undefined || this.selectedLineType.Id == undefined || this.selectedScheduleType.Id == undefined){
      alert("Morate izabrati sva tri polja!");
    }else{
      this.sheduleLineService.getSheduleForSelectedLine(this.selectedL.Id,this.selectedScheduleType.Id).subscribe(
        (data: Schedule) => {
          if(data === null){
            this.schedule.Departure = "Nema rezultata";
          }else{
            (this.schedule = data)  
          }         
        },
        err => console.log(err)
      );            
    }
  }

  dodajRed(){
    this.router.navigate(['admin','adminAddSchedule']);
  }

  izmeniRed(){
    this.router.navigate(['admin','adminChangeSchedule'])
  }

  obrisiRed(){
    this.router.navigate(['admin','adminDeleteSchedule'])
  }
}
