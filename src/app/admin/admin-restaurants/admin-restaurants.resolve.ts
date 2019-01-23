import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { RestaurantListService } from "./restaurant-list/services/restaurant-list.service";


@Injectable()
export class AdminRestaurantsListResolve implements Resolve<any> {

  constructor(private restaurantService: RestaurantListService) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.restaurantService.getRestaurantList();
  }
} 