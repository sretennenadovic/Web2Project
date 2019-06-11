import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { UserProfileHttpService, EditUserProfileService } from 'src/app/services/profiles/user.profile.service';
import { RegisterModel } from 'src/app/models/RegisterModel';

@Component({
  selector: 'app-passenger-profile',
  templateUrl: './passenger-profile.component.html',
  styleUrls: ['./passenger-profile.component.css'],
  providers: [EditUserProfileService]
})
export class PassengerProfileComponent implements OnInit {

  userProfileInfo:RegisterModel = new RegisterModel();

  profileForm = this.fb.group({
    Email: ['',[Validators.required,Validators.minLength(6)]],
    FirstName: ['',Validators.required],
    LastName: ['',Validators.required],
    BirthDate: ['', Validators.required],
    PassengerType: ['', Validators.required],
    Address: ['', Validators.required],
    Approved:['']
  })
  constructor(private fb:FormBuilder,
              private httpUserProfile:UserProfileHttpService,
              private httpEditUserProfile:EditUserProfileService) { }

  ngOnInit() {
    this.httpUserProfile.getSpecific().subscribe((userProfileInfo) => {
      this.userProfileInfo = userProfileInfo;

      if (userProfileInfo.Approved == "True") {
        this.userProfileInfo.Approved = "Odobren";
      } 
      else {
        this.userProfileInfo.Approved = "Nije odobren";
      }

      if (userProfileInfo.PassengerTypeId == 1) {
        this.userProfileInfo.PassengerType = "Djak/Student";
      }
      else if (userProfileInfo.PassengerTypeId == 2) {
        this.userProfileInfo.PassengerType = "Penzioner";
      }
      else if (userProfileInfo.PassengerTypeId == 3) {
        this.userProfileInfo.PassengerType = "Regularan";
      }

      this.profileForm.patchValue({ FirstName : userProfileInfo.FirstName, LastName: userProfileInfo.LastName, 
        Email: userProfileInfo.Email, Address : userProfileInfo.Address, 
        BirthDate : userProfileInfo.BirthDate, verificationStatus : userProfileInfo.Approved, 
      PassengerType : userProfileInfo.PassengerType, Approved: userProfileInfo.Approved })
  })
  
}

change(){
  this.httpEditUserProfile.post(this.profileForm.value).subscribe(data =>{
    if(data){
      alert("Uspesno ste napravili izmene na profilu!")
    }else{
      alert("Doslo je do greske! Pokusaj opet!")
    }
  })
}

}
