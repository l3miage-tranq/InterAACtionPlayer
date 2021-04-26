import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  public themeObservable = new Subject<string>();

  public theme = "";

  constructor() { }

  emitTheme(val){
    this.themeObservable.next(val);
    this.theme = val;
  }

  getTypeTheme(){
    return this.theme == "";
  }
}
