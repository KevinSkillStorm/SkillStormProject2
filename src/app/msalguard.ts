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
    id: number;

    constructor(private msalService: MsalService, private appService: AppService, private userService: UsersService, private route: ActivatedRoute) {
        let url = this.route.snapshot.url.join('/');
        let urlParams = url.split('/');
        this.id = +urlParams[2];
     }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if (this.msalService.instance.getActiveAccount() == null) {
            return false
        }
        this.appService.currentEvent.subscribe(res => {
            console.log(res)
            console.log(this.id)
            if (res != this.id) {
                return false;
            }
            return true;
        })
        return true;
    }
}