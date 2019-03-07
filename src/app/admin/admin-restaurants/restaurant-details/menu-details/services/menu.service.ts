import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { MenuCategoryModel } from "../models/menu-category.model";

@Injectable()
export class MenuService {

    constructor(
        private http: HttpClient
    ) { }

    saveMenuCategory(menu: MenuCategoryModel, restaurantId: string) {
        const url = `${environment.service_URL}/admin/restaurants/menu/save/${restaurantId}`;
        return this.http.post(url, menu).toPromise();
    }

    getMenuCategoryItesm(restaurantId: string) {
        const url = `${environment.service_URL}/admin/restaurants/menu/list/${restaurantId}`;
        return this.http.get(url).toPromise();
    }

    deleteMenuCategoryItem(categoryId: string) {
        const url = `${environment.service_URL}/admin/restaurants/menu/delete/${categoryId}`;
        return this.http.delete(url).toPromise();
    }

}