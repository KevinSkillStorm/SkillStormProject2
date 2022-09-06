import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor() { }
  public sendCurrentUserId(id: number): void{
    // this.sendEvent.next(id);
    localStorage.removeItem("id");
    localStorage.setItem("id", "" + id);
  }
  public getCurrentUserId(): number {
    return +localStorage.getItem("id")!;
  }
}
