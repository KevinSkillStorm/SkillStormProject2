import { Injectable } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { MsalService } from "@azure/msal-angular";
import { Observable } from "rxjs";
import { AppComponent } from "./app.component";
import { IndexComponent } from "./users/index/index.component";
import { ViewComponent } from "./users/view/view.component";

@Injectable({
    providedIn: 'root'
})

export class MsalGuard implements CanActivate {
    constructor(
        private msalService: MsalService,
        private indexComponent: IndexComponent,
        private viewComponent: ViewComponent,    
        private route: ActivatedRoute,    
        private app: AppComponent,
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {  
        console.log("SSSSSSSSSSSSSSSS");      
        if (this.msalService.instance.getActiveAccount() != null && this.indexComponent.currentUserId == this.viewComponent.id) {
            return true;
        } else {
            return false;
        }

    }
}