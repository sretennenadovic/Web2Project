import { Component, OnInit } from '@angular/core';
import { ScheduleType } from 'src/app/models/ScheduleType';
import { Line } from 'src/app/models/Line';
import { ScheduleHttpService, SchedulePostHttpService } from 'src/app/services/schedule/schedule.service';
import { ScheduleInfo } from 'src/app/models/scheduleInfo';
import { Schedule } from 'src/app/models/Schedule';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-add-schedule',
  templateUrl: './admin-add-schedule.component.html',
  styleUrls: ['./admin-add-schedule.component.css'],
  providers:[SchedulePostHttpService]
})
export class AdminAddScheduleComponent implements OnInit {

  values: ScheduleInfo = new ScheduleInfo();
  selectedScheduleType:ScheduleType = new ScheduleType();
  selectedL:Line = new Line();
  inputSchedule:string;
  schedule:Schedule = new Schedule();

  constructor(private http: ScheduleHttpService,
              private schedulePost: SchedulePostHttpService,
              private router:Router ) { }

  ngOnInit() {
    this.http.getSpecific().subscribe(
      values => {
        (this.values = values)
          console.log(values);
      },
      err => console.log(err)
    );
  }

  addSchedule(){
    if(this.selectedScheduleType.Id==undefined || this.selectedL.Id==undefined || this.inputSchedule==undefined)
    {
      alert("Morate popuniti/cekirati sva 3 polja!")
    }else{  
      this.schedule.Departure = this.inputSchedule;
      this.schedule.LineId = this.selectedL.Id;
      this.schedule.ScheduleTypeId = this.selectedScheduleType.Id;

      this.schedulePost.post(this.schedule).subscribe(data =>
        {
          if(data === true){
            alert("Uspesno ste uneli red voznje!");
            this.router.navigate(['admin','adminSchedule'])
          } else if(data === false){
            alert("Vec postoji odabrani red voznje za tu liniju!");
          }       
          
        }, err=> console.log(err))
    }
  }

}
