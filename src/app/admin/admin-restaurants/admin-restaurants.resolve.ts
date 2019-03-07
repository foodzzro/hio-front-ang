import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { RestaurantListService } from "./restaurant-list/services/restaurant-list.service";
import { RestaurantDetailsService } from "./restaurant-details/services/restaurant-details.service";


@Injectable()
export class AdminRestaurantsListResolve implements Resolve<any> {

  constructor(private restaurantService: RestaurantListService) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.restaurantService.getRestaurantList();
  }
} 

@Injectable()
export class AdminRestaurantsItemResolve implements Resolve<any> {

  constructor(private restaurantService: RestaurantDetailsService) { }

  resolve(route: ActivatedRouteSnapshot) {
    const id = route.params.id
    return this.restaurantService.getRestaurant(id);
  }
} 