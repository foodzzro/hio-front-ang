import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RestaurantListComponent } from "./restaurant-list/restaurant-list.component";
import { RestaurantDetailsComponent } from "./restaurant-details/restaurant-details.component";
import { AdminRestaurantsListResolve, AdminRestaurantsItemResolve } from "./admin-restaurants.resolve";

const routes: Routes = [
    {
      path: "list",
      component: RestaurantListComponent,
      resolve: {
          restaurantList: AdminRestaurantsListResolve
        }
    },
    {
      path: "details",
      component: RestaurantDetailsComponent
    },
    {
        path: "details/:id",
        component: RestaurantDetailsComponent,
        resolve: {
          restaurant: AdminRestaurantsItemResolve
        }
    }
  ];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
}) 
export class AdminRestaurantsRoutingModule {};   