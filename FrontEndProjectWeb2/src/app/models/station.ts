import { Line } from './Line';

export class Station{
    Id:number;
    Name:string;
    Longitude:number;
    Latitude:number;
    Address:string;
    Lines:Line[];
}