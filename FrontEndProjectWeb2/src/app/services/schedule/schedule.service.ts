import { BaseHttpService } from "../http/base-http.service";
import { ScheduleInfo } from "src/app/models/scheduleInfo";
import { Injectable } from "@angular/core";

@Injectable()
export class ScheduleHttpService extends BaseHttpService<ScheduleInfo> {
  specificUrl = "/api/Schedules/GetScheduleInfo";
}
