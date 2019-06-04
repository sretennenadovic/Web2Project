import { ScheduleType } from './ScheduleType';
import { Line } from './Line';

export class Schedule{
    Id:number;
    Departure:string = "";
    ScheduleTypeId:number;
    ScheduleType:ScheduleType;
    LineId:number;
    Line:Line;
}