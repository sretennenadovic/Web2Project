import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Ticket } from 'src/app/models/Ticket';
import { TicketUnauthorized } from 'src/app/models/TicketUnauthorized';

@Injectable()
export class BaseHttpService<T> {
  baseUrl = "http://localhost:52295";
  specificUrl = "";

  constructor(private http: HttpClient) {}
  //za sve ostalo isto idu metode
  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.baseUrl + this.specificUrl);
  }

  getById(id: number): Observable<T> {
    return this.http.get<T>(this.baseUrl + this.specificUrl + `/${id}`);
  }

  post(data:any, options?:any):Observable<any>{
    return this.http.post<any>(this.baseUrl + this.specificUrl, data, options);
  }

  put(data:any, id:number):Observable<any>{
    return this.http.put(this.baseUrl + this.specificUrl + `/${id}`,data);
  }

  delete(id:number):Observable<any>{
    return this.http.delete(this.baseUrl + this.specificUrl + `/${id}`);
  }

  postOneTimeTicket(tu:TicketUnauthorized, options?:any):Observable<any>{
    return this.http.post<any>(this.baseUrl + this.specificUrl, tu, options);
  }

  //Dobravljanje odredjenih info sa servera, pri inicijalizaciji izgleda komponenti
  getSpecific():Observable<T>{
    return this.http.get<T>(this.baseUrl + this.specificUrl);
  }

  //Dobavljanje info o jednom rasporedu u odnosu na odabranu liniju i tip
  getSheduleForSelectedLine(idLine:number,idScheduleType:number):Observable<T>{
    return this.http.get<T>(this.baseUrl + this.specificUrl + `/${idLine}/${idScheduleType}`);
  }
}
