import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor() { }
  public sendCurrentUserId(id: number){
    // this.sendEvent.next(id);
    return localStorage.setItem("id", "" + id);
  }
  public getCurrentUserId(): number {
    return +localStorage.getItem("id")!;
  }
}
