import { Component, OnInit } from '@angular/core';
import { Schedule } from 'src/app/models/Schedule';
import { ScheduleInfo } from 'src/app/models/scheduleInfo';
import { ScheduleType } from 'src/app/models/ScheduleType';
import { Line } from 'src/app/models/Line';
import { ScheduleGetAllHttpService, ScheduleHttpService, ScheduleDeleteHttpService } from 'src/app/services/schedule/schedule.service';

@Component({
  selector: 'app-admin-delete-schedule',
  templateUrl: './admin-delete-schedule.component.html',
  styleUrls: ['./admin-delete-schedule.component.css'],
  providers: [ScheduleGetAllHttpService, ScheduleDeleteHttpService]
})
export class AdminDeleteScheduleComponent implements OnInit {

  values:Schedule[];
  updatedSchedule:Schedule = new Schedule();
  valuesSI: ScheduleInfo = new ScheduleInfo();
  selectedScheduleType:ScheduleType = new ScheduleType();
  selectedL:Line = new Line();
  inputSchedule:string;
  selectedScheduleId:number;

  constructor(private getAllSchedulesHttp:ScheduleGetAllHttpService,
              private http: ScheduleHttpService,
              private adminDeleteScheduleService:ScheduleDeleteHttpService) { }

  ngOnInit() {
    this.getAllSchedulesHttp.getAll().subscribe(data =>{
      this.values = data;
    })

    this.http.getSpecific().subscribe(
      data2 => {
        (this.valuesSI = data2)
          console.log(data2);
      },
      err => console.log(err)
    );
  }
  lineChange(){
    this.inputSchedule = ""
    if(this.selectedScheduleType.Id != undefined && this.selectedL.Id != undefined){
      for(let departure of this.values){
        if(departure.LineId == this.selectedL.Id && departure.ScheduleTypeId == this.selectedScheduleType.Id){
          this.inputSchedule = departure.Departure;
          this.selectedScheduleId = departure.Id;
        }
      }
      if(this.inputSchedule == ""){
        this.inputSchedule = "Nepostoji red voznje"
      }
    }
  }

  scheduleTypeChange(){
    this.inputSchedule = ""
    if(this.selectedScheduleType.Id != undefined && this.selectedL.Id != undefined){
      for(let departure of this.values){
        if(departure.LineId == this.selectedL.Id && departure.ScheduleTypeId == this.selectedScheduleType.Id){
          this.inputSchedule = departure.Departure;
          this.selectedScheduleId = departure.Id;
        }
      }
      if(this.inputSchedule == ""){
        this.inputSchedule = "Nepostoji red voznje"
      }
    }
  }

  deleteSchedule(){
    if(this.selectedScheduleType.Id==undefined || this.selectedL.Id==undefined)
    {
      alert("Morate cekirati obe opcije!")
    }else if(this.inputSchedule==='Nepostoji red voznje'){ 
      alert("Mora postojati red voznje!")
    }else{
      this.updatedSchedule.Id = this.selectedScheduleId;
      this.updatedSchedule.LineId = this.selectedL.Id;
      this.updatedSchedule.ScheduleTypeId = this.selectedScheduleType.Id;
      this.updatedSchedule.Departure = this.inputSchedule
      this.adminDeleteScheduleService.delete(this.selectedScheduleId).subscribe(data => {
        alert("Red voznje sa ID: "+data.Id+", je uspesno obrisan!");
      })
    }
  }
}
