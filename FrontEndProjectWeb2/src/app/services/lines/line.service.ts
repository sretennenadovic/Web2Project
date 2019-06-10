import { BaseHttpService } from '../http/base-http.service';
import { Injectable } from '@angular/core';
import { Line } from 'src/app/models/Line';

@Injectable()
export class LineHttpService extends BaseHttpService<Line> {
  specificUrl = "/api/Lines";
}

@Injectable()
export class LinValidationHttpService extends BaseHttpService<any> {
  specificUrl = "/api/Lines/GetTicketValidation";
}