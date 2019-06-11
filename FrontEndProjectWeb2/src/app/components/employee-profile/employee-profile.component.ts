import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ApplicationUserHttpService, EditAdminProfileHttpService } from 'src/app/services/profiles/user.profile.service';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css'],
  providers: [ApplicationUserHttpService,EditAdminProfileHttpService]
})
export class EmployeeProfileComponent implements OnInit {

  profileForm = this.fb.group({
    Email: ['',[Validators.required,Validators.minLength(6)]],
    FirstName: ['',Validators.required],
    LastName: ['',Validators.required],
    BirthDate: ['', Validators.required],
    Address: ['', Validators.required],
  })
  constructor(private fb:FormBuilder,
              private httpEmployeeInfo:ApplicationUserHttpService,
              private httpPostEmployeeInfo:EditAdminProfileHttpService) { }

  ngOnInit() {
    this.httpEmployeeInfo.getSpecific().subscribe(
      data=>{
        this.profileForm.patchValue({ FirstName : data.FirstName, LastName: data.LastName, 
          Email: data.Email, Address : data.Address, 
          BirthDate : data.BirthDate })
      }
    )
  }

  change(){
    this.httpPostEmployeeInfo.post(this.profileForm.value).subscribe(data=>{
      if(data){
        alert("Uspesno ste izmenili profil!")
      }else{
        alert("Doslo je do greske pri izmeni! Pokusajte opet!")
      }
    })
  }
}
