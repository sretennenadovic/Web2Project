import { LineType } from "./LineType";
import { Station } from './station';
import { Schedule } from './Schedule';

export class Line {
  Id: number;
  Name: string;
  Number: number;
  LineTypeId: number;
  LineType: LineType;
  Stations:Station[];
  Schedules:Schedule[];
  Order:string;
}
