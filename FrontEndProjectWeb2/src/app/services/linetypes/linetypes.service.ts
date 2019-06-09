import { BaseHttpService } from '../http/base-http.service';
import { Injectable } from '@angular/core';
import { LineType } from 'src/app/models/LineType';

@Injectable()
export class LineTypeHttpService extends BaseHttpService<LineType> {
  specificUrl = "/api/LineTypes";
}