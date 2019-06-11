import { RegisterModel } from 'src/app/models/RegisterModel';
import { BaseHttpService } from '../http/base-http.service';
import { Injectable } from '@angular/core';

@Injectable()
export class UserProfileHttpService extends BaseHttpService<RegisterModel> {
    specificUrl = "/api/Account/RegularUserInfo"
}

@Injectable()
export class EditUserProfileService extends BaseHttpService<RegisterModel> {
    specificUrl = "/api/Account/PostUserInfo"
}

@Injectable()
export class ApplicationUserHttpService extends BaseHttpService<RegisterModel>{
    specificUrl = "/api/Account/UserInfo"
}

@Injectable()
export class EditAdminProfileHttpService extends BaseHttpService<RegisterModel> {
    specificUrl = "/api/Account/PostAdminInfo"
}
