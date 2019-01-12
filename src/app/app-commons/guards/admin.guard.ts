import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router/src/utils/preactivation";
import { ActivatedRouteSnapshot, Router } from "@angular/router";
import { LocalStorageService } from "../helpers/local-storage.service";


@Injectable()
export class AdminGuard implements CanActivate {
    path: ActivatedRouteSnapshot[];
    route: ActivatedRouteSnapshot;
    
  constructor(public router: Router, private store: LocalStorageService) {}

  canActivate(route: ActivatedRouteSnapshot): any {

      let user = this.store.get('user');
      if(!user) { return false; }

      for (let item of user.roles) {
        let canAccess = route.data.roles.find(role => role === item);
        if(canAccess) {
            return true;
        }
      }
    
      this.router.navigateByUrl("/login");
      return false;
  }
}
