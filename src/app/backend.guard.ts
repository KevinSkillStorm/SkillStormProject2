import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendGuard implements CanActivate {

  constructor(
    private msalService: MsalService
  ){

  };

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.msalService.instance.getActiveAccount() != null) {
        console.log("authenticated user is found");
        return true;
      } else {
        console.log("nope, authenticated user is NOT found and shouldn't be able to view anything");
        return false;
      }
  }
  
}
