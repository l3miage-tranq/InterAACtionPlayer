import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DwelltimeService {

  dwellTime: boolean = false;
  dwellTimeValue = 1000;

  constructor() { }
}
