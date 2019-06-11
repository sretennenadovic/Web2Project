import { RegisterModel } from 'src/app/models/RegisterModel';
import { BaseHttpService } from '../http/base-http.service';

export class UserProfileHttpService extends BaseHttpService<RegisterModel> {
    specificUrl = "/api/Account/RegularUserInfo"
}


export class EditUserProfileService extends BaseHttpService<RegisterModel> {
    specificUrl = "/api/Account/PostUserInfo"
}