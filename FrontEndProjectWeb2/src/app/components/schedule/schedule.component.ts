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
    this.http.getSpecific().subscribe(
      values => {
        (this.values = values)
          console.log(values);
      },
      err => console.log(err)
    );
  }
}
