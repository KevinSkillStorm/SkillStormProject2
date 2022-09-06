import { Injectable } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { MsalService } from "@azure/msal-angular";
import { Observable } from "rxjs";
import { AppService } from "./app.service";
import { UsersService } from "./users/users.service";

@Injectable({
    providedIn: 'root'
})

export class MsalGuard implements CanActivate {
    constructor(private msalService: MsalService, private appService: AppService) {
     }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        // let routeId = +route.url.join('/').split('/')[1];
        // console.log(routeId)
        if (this.msalService.instance.getActiveAccount() == null) {
            return false
        }
        // if (localStorage.getItem("id")!= null && +localStorage.getItem("id")! != routeId) {
        //     return false;
        // }
        return true;
    }
}