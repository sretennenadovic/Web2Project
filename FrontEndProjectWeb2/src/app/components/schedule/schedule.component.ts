import { Component, OnInit } from "@angular/core";
import { ScheduleHttpService } from "src/app/services/schedule/schedule.service";
import { ScheduleInfo } from "src/app/models/scheduleInfo";

@Component({
  selector: "app-schedule",
  templateUrl: "./schedule.component.html",
  styleUrls: ["./schedule.component.css"]
})
export class ScheduleComponent implements OnInit {
  values: ScheduleInfo;

  constructor(private http: ScheduleHttpService) {}

  ngOnInit() {
    this.http.getAll().subscribe(
      values => {
        (this.values.LineTypes = values.LineTypes),
          (this.values.Lines = values.Lines),
          (this.values.ScheduleTypes = values.ScheduleTypes),
          console.log(values);
      },
      err => console.log(err)
    );
  }
}
