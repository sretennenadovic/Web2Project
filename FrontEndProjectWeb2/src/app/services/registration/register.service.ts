import { BaseHttpService } from "../http/base-http.service";
import { Injectable } from '@angular/core';

@Injectable()
export class Register extends BaseHttpService<any>{
    specificUrl = "/api/Account/Register"
}

@Injectable()
export class RegisterController extends BaseHttpService<any>{
    specificUrl = "/api/Account/PostRegisterController"
}

@Injectable()
export class UploadImage extends BaseHttpService<any>{
    specificUrl = "/api/Account/UplaodImage"
}