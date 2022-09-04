import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private sendEvent = new BehaviorSubject<number>(-1);
  currentEvent = this.sendEvent.asObservable();
  constructor() { }
}
