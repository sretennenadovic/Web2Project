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

@Injectable()
export class SchedulePostHttpService extends BaseHttpService<Schedule> {
  specificUrl = "/api/Schedules";
}

@Injectable()
export class ScheduleGetAllHttpService extends BaseHttpService<Schedule> {
  specificUrl = "/api/Schedules";
}

@Injectable()
export class SchedulePutHttpService extends BaseHttpService<Schedule> {
  specificUrl = "/api/Schedules";
}

@Injectable()
export class ScheduleDeleteHttpService extends BaseHttpService<Schedule> {
  specificUrl = "/api/Schedules";
}