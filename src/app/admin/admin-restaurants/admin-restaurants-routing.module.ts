import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RestaurantListComponent } from "./restaurant-list/restaurant-list.component";
import { RestaurantDetailsComponent } from "./restaurant-details/restaurant-details.component";

const routes: Routes = [
    {
      path: "list",
      component: RestaurantListComponent,
    },
    {
        path: "details",
        component: RestaurantDetailsComponent
    }
  ];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
}) 
export class AdminRestaurantsRoutingModule {};   