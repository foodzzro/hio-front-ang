import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RestaurantDetailsModel } from '../../models/RestaurantDetailsModel';

@Injectable({
  providedIn: 'root'
})
export class RestaurantListService {

  constructor(
    private http: HttpClient
  ) { }

  getRestaurantList() {
    const url = `${environment.service_URL}/admin/restaurants/list`;
    return this.http.get(url);
  }

  saveImage(image, id) {
    let form = new FormData();
    form.append("file", image);
    const url = `${environment.service_URL}/admin/restaurants/update-image/${id}`;
    return this.http.post(url, form).toPromise();
  }
}
