import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminUsersModule } from './admin-users/admin-users.module';
import { AdminRestaurantModule } from './admin-restaurants/admin-restaurants.module';


const routes: Routes = [
  {
    path: "users",
    loadChildren: () => AdminUsersModule
  },
  {
    path: 'restaurant',
    loadChildren: () => AdminRestaurantModule
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
}) 
export class AdminRoutingModule { }
 