import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { AdminUsersService } from "./admin-users.service";


@Injectable()
export class AdminUsersResolve implements Resolve<any> {

  constructor(private usersService: AdminUsersService) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.usersService.getUsers();
  }
}