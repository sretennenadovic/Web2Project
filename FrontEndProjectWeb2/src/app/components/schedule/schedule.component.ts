import { Component, OnInit } from "@angular/core";
import { ScheduleHttpService, ScheduleLineHttpService } from "src/app/services/schedule/schedule.service";
import { ScheduleInfo } from "src/app/models/scheduleInfo";
import { ScheduleType } from 'src/app/models/ScheduleType';
import { LineType } from 'src/app/models/LineType';
import { Line } from 'src/app/models/Line';
import { Schedule } from 'src/app/models/Schedule';

@Component({
  selector: "app-schedule",
  templateUrl: "./schedule.component.html",
  styleUrls: ["./schedule.component.css"]
})
export class ScheduleComponent implements OnInit {
  values: ScheduleInfo = new ScheduleInfo();
  selectedScheduleType:ScheduleType = new ScheduleType();
  selectedLineType:LineType = new LineType();
  selectedL:Line = new Line();
  schedule: Schedule = new Schedule();

  constructor(private http: ScheduleHttpService, private sheduleLineService:ScheduleLineHttpService) {}

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
}
