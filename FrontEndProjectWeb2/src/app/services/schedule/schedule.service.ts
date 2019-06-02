import { BaseHttpService } from "../http/base-http.service";
import { ScheduleInfo } from "src/app/models/scheduleInfo";
import { Injectable } from "@angular/core";
import { Schedule } from 'src/app/models/Schedule';

@Injectable()
export class ScheduleHttpService extends BaseHttpService<ScheduleInfo> {
  specificUrl = "/api/Schedules/GetScheduleInfo";
}

@Injectable()
export class ScheduleLineHttpService extends BaseHttpService<Schedule> {
  specificUrl = "/api/Schedules/GetScheduleForSelectedLine";
}

