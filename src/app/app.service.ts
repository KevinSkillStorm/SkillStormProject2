import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  [x: string]: any;
  private sendEvent = new BehaviorSubject<number>(-1);
  currentEvent = this.sendEvent.asObservable();
  constructor() { }
  public sendCurrentUserId(id: number){
    this.sendEvent.next(id);
  }
}
