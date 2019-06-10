import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { RegisterModel } from 'src/app/models/RegisterModel';
import { RegisterController } from 'src/app/services/registration/register.service';

@Component({
  selector: 'app-add-controller',
  templateUrl: './add-controller.component.html',
  styleUrls: ['./add-controller.component.css'],
  providers: [RegisterController]
})
export class AddControllerComponent implements OnInit {

  registerForm = this.fb.group({
    Email: ['',[Validators.required,Validators.minLength(6)]],
    Password: ['',[Validators.required,Validators.minLength(6)]],
    ConfirmPassword: ['',Validators.required],
    FirstName: ['',Validators.required],
    LastName: ['',Validators.required],
    BirthDate: ['', Validators.required],
    Address: ['', Validators.required]
  })
  constructor(private fb:FormBuilder,
              private registerController: RegisterController) { }

  ngOnInit() {
  }

  registerUser(){
    let regModel: RegisterModel = this.registerForm.value;

    this.registerController.post(regModel).subscribe(data =>{
      alert("Uspesno ste registrovali kontrolera!");
    }),
    err=>console.log(err);
  }
}
