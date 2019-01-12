import { Routes, RouterModule } from "@angular/router";

import { UsersListComponent } from "./users-list/users-list.component";

import { AdminUsersResolve } from "./admin-users.resolve";

import { NgModule } from "@angular/core";

const routes: Routes = [
    {
      path: "list",
      component: UsersListComponent,
      resolve: {
        users: AdminUsersResolve
      }
    },
  ];
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  }) 
  export class AdminUsersRoutingModule { }
   