import { NgModule } from "@angular/core";
import { NgxPaginationModule } from "ngx-pagination";
import { RestaurantListComponent } from "./restaurant-list/restaurant-list.component";
import { RestaurantDetailsComponent } from "./restaurant-details/restaurant-details.component";
import { TabDetailsComponent } from "./restaurant-details/tab-details/tab-details.component";
import { DeliveryAreaComponent } from "./restaurant-details/delivery-area/delivery-area.component";
import { MenuDetailsComponent } from "./restaurant-details/menu-details/menu-details.component";
import { DiscountCodeComponent } from "./restaurant-details/discount-code/discount-code.component";
import { ManagerComponent } from "./restaurant-details/manager/manager.component";
import { AdminRestaurantsRoutingModule } from "./admin-restaurants-routing.module";
import { AdminSharedModulesModule } from "src/app/app-commons/admin/admin-shared-module.module";
import { MenuSectionComponent } from './restaurant-details/menu-details/components/menu-section/menu-section.component';
import { MenuItemComponent } from './restaurant-details/menu-details/components/menu-item/menu-item.component';
import { MenuOptionComponent } from './restaurant-details/menu-details/components/menu-option/menu-option.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatExpansionModule} from '@angular/material/expansion';
import { TemplateMenuComponent } from './restaurant-details/menu-details/components/template-menu/template-menu.component';
import { ExtraOptionListComponent } from "src/app/app-commons/admin/components/extra-option-list/extra-option-list.component";
import { RestaurantCardListComponent } from './restaurant-list/components/restaurant-card-list/restaurant-card-list.component';
import { AdminRestaurantsListResolve } from "./admin-restaurants.resolve";
import {StickyModule} from 'ng2-sticky-kit';


@NgModule({
    declarations: [
        RestaurantListComponent, 
        RestaurantDetailsComponent, 
        TabDetailsComponent, 
        DeliveryAreaComponent, 
        MenuDetailsComponent, 
        DiscountCodeComponent, 
        ExtraOptionListComponent,
        ManagerComponent, MenuSectionComponent, MenuItemComponent, MenuOptionComponent, TemplateMenuComponent, RestaurantCardListComponent,
    ],
    imports: [
        AdminSharedModulesModule,
        AdminRestaurantsRoutingModule,
        NgxPaginationModule,
        StickyModule,

        DragDropModule,
        MatExpansionModule,
    ],
    providers: [
        AdminRestaurantsListResolve
    ]
})
export class AdminRestaurantModule {}