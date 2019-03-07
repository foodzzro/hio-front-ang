import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RestaurantDetailsModel } from '../../models/RestaurantDetailsModel';
import { RestaurantDeliveryZoneModel } from '../../models/DeliveryZoneModel';

@Injectable({
  providedIn: 'root'
})
export class RestaurantDetailsService {

  constructor(
    private http: HttpClient
  ) { }

  getRestaurant(id: number) {
    const url = `${environment.service_URL}/admin/restaurants/restaurant/${id}`;
    return this.http.get(url);
  }

  saveRestaurant(restaurant: RestaurantDetailsModel) {
    const url = `${environment.service_URL}/admin/restaurants/update`;
    return this.http.post(url, restaurant).toPromise();
  }

  getDeliveryZones(id: string) {
    const url = `${environment.service_URL}/admin/restaurants/delivery-zones/${id}`;
    return this.http.get(url).toPromise();
  }

  saveDeliveryZone(restaurantId: string, zone: RestaurantDeliveryZoneModel) {
    const url = `${environment.service_URL}/admin/restaurants/delivery-zones/${restaurantId}`;
    return this.http.post(url, zone).toPromise();
  }

  updateDeliveryZone(restaurantId: string, zone: RestaurantDeliveryZoneModel) {
    const url = `${environment.service_URL}/admin/restaurants/delivery-zones/${restaurantId}`;
    return this.http.put(url, zone).toPromise();
  }

  deleteDeliveryZone(id: string) {
    const url = `${environment.service_URL}/admin/restaurants/delivery-zones/${id}`;
    return this.http.delete(url).toPromise();
  }
}
