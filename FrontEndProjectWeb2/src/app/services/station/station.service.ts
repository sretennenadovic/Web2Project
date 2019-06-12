import { BaseHttpService } from '../http/base-http.service';
import { Injectable } from '@angular/core';
import { Station } from 'src/app/models/station';

@Injectable()
export class StationHttpService extends BaseHttpService<any> {
  specificUrl = "/api/Stations";
}