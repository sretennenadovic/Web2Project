import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Register } from 'src/app/services/registration/register.service';
import { RegisterModel } from 'src/app/models/RegisterModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers:[Register]
})
export class RegisterComponent implements OnInit {

  selectedFile: File = null;
  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
  }

  registerForm = this.fb.group({
    Email: ['',[Validators.required,Validators.minLength(6)]],
    Password: ['',[Validators.required,Validators.minLength(6)]],
    ConfirmPassword: ['',Validators.required],
    FirstName: ['',Validators.required],
    LastName: ['',Validators.required],
    BirthDate: ['', Validators.required],
    PassengerType: ['', Validators.required],
    Address: ['', Validators.required]
  })

  constructor(private fb: FormBuilder, private register:Register, private router:Router) { }

  ngOnInit() {
  }

  login(){
    this.router.navigate(['unauthorizedUser','login'])
  }

  registerUser() {
    let regModel: RegisterModel = this.registerForm.value;
    let formData: FormData = new FormData();

    if (this.selectedFile != null) {


      formData.append('picture', this.selectedFile, this.selectedFile.name);
    }

    let options = {
      sheaders:
      {
        "Content-type": "application/json"
      }
    }
    this.register.post(regModel).subscribe(
      ret => {

      /*  if (this.selectedFile != null) {
          this.accountService.uploadImage(formData, regModel.username, options).subscribe(ret => {
            alert("Succesfully registered!");
            this.router.navigate(['unauthorizedUser','login']);
          },
            err => console.log(err));
        }*/
       // else {
          alert("Uspesno ste se registrovali!");
          this.router.navigate(['unauthorizedUser','login']);
       // }

      },
      err => {
        console.log(err);
      }
    );
  }

}
