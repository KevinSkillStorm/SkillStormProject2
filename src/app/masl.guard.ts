import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { Observable } from 'rxjs';
import { AppComponent } from './app.component';

@Injectable({
  providedIn: 'root'
})
export class MaslGuard implements CanActivate {
  id!: number;

  variableName?: string;
  constructor(
    private msalService: MsalService,
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    let url = route.url.join('/');
    let urlParams = url.split('/');
    this.id = +urlParams[1];

    if (this.msalService.instance.getActiveAccount() != null && +localStorage.getItem('id')! == this.id) {
      console.log("FIrst if");
      return true;
    } else {
      console.log("nope");
      return false;
    }
  }
}
