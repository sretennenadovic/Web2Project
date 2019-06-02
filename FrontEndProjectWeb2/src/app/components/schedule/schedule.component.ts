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
  schedule: Schedule;
  departures : string = "  placeHolder";

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
 
  changeOfLineType() {
    console.log("linija "+ this.selectedLineType.Id);
  }

  changeOfScheduleType(){
    console.log("RedV "+ this.selectedScheduleType.Id);
  }

  selectedLine(line:Line){
    this.sheduleLineService.getSheduleForSelectedLine(line.Id,this.selectedScheduleType.Id).subscribe(
      (data: Schedule) => {
        (this.schedule = data) 
        console.log(this.schedule.Departure)   
        console.log(this.schedule)    
      },
      err => console.log(err)
    );
  }
}
