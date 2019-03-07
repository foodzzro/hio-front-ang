import { NgModule } from "@angular/core";
import { NgxPaginationModule } from "ngx-pagination";
import { RestaurantListComponent } from "./restaurant-list/restaurant-list.component";
import { RestaurantDetailsComponent } from "./restaurant-details/restaurant-details.component";
import { DeliveryAreaComponent } from "./restaurant-details/delivery-area/delivery-area.component";
import { DiscountCodeComponent } from "./restaurant-details/discount-code/discount-code.component";
import { ManagerComponent } from "./restaurant-details/manager/manager.component";
import { AdminRestaurantsRoutingModule } from "./admin-restaurants-routing.module";
import { AdminSharedModulesModule } from "src/app/app-commons/admin/admin-shared-module.module";
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatExpansionModule} from '@angular/material/expansion';
import { AdminRestaurantsListResolve, AdminRestaurantsItemResolve } from "./admin-restaurants.resolve";
import {StickyModule} from 'ng2-sticky-kit';
import { TabDetailsComponent } from "./restaurant-details/restaurant-tab-details/restaurant-tab-details.component";
import { RestaurantDetailsService } from "./restaurant-details/services/restaurant-details.service";
import { AddDeliveryAreaComponent } from "./restaurant-details/delivery-area/add-delivery-area.component";
import { EditDeliveryAreaComponent } from "./restaurant-details/delivery-area/edit-delivery-area.component";
import { RestaurantMenuModule } from "./restaurant-details/menu-details/restaurant-menu.module";


@NgModule({
    declarations: [
        RestaurantListComponent,
        RestaurantDetailsComponent,
        TabDetailsComponent,
        DeliveryAreaComponent,
        DiscountCodeComponent,
        ManagerComponent,
        AddDeliveryAreaComponent,
        EditDeliveryAreaComponent
    ],
    imports: [
        AdminSharedModulesModule,
        AdminRestaurantsRoutingModule,
        RestaurantMenuModule,
        NgxPaginationModule
    ],
    providers: [
        AdminRestaurantsListResolve,
        AdminRestaurantsItemResolve,
        RestaurantDetailsService
    ]
})
export class AdminRestaurantModule {}