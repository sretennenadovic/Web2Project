import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

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

  //Dobravljanje odredjenih info sa servera, pri inicijalizaciji izgleda komponenti
  getSpecific():Observable<T>{
    return this.http.get<T>(this.baseUrl + this.specificUrl);
  }

  //Dobavljanje info o jednom rasporedu u odnosu na odabranu liniju i tip
  getSheduleForSelectedLine(idLine:number,idScheduleType:number):Observable<T>{
    return this.http.get<T>(this.baseUrl + this.specificUrl + `/${idLine}/${idScheduleType}`);
  }
}
