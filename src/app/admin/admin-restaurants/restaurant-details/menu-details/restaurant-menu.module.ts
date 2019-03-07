import { NgModule } from "@angular/core";
import { TemplateMenuComponent } from "./components/template-menu/template-menu.component";
import { MenuOptionComponent } from "./components/menu-option/menu-option.component";
import { MenuDetailsComponent } from "./menu-details.component";
import { MenuItemComponent } from "./components/menu-item/menu-item.component";
import { RestaurantCardListComponent } from "../../restaurant-list/components/restaurant-card-list/restaurant-card-list.component";
import { ExtraOptionListComponent } from "src/app/app-commons/admin/components/extra-option-list/extra-option-list.component";
import { AdminSharedModulesModule } from "src/app/app-commons/admin/admin-shared-module.module";
import { AdminRestaurantsRoutingModule } from "../../admin-restaurants-routing.module";
import { StickyModule } from "ng2-sticky-kit";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { MatExpansionModule } from "@angular/material/expansion";
import { MenuService } from "./services/menu.service";
import { MenuCategoryComponent } from "./components/menu-category/menu-category.component";
import { AddMenuCategoryComponent } from "./components/menu-category/add-menu-category.component";


@NgModule({
    declarations: [
        MenuDetailsComponent,
        MenuCategoryComponent, 
        MenuItemComponent, 
        MenuOptionComponent, 
        TemplateMenuComponent,
        RestaurantCardListComponent,
        ExtraOptionListComponent,
        AddMenuCategoryComponent
    ],
    imports: [
        AdminSharedModulesModule,
        AdminRestaurantsRoutingModule,
        StickyModule,
        DragDropModule,
        MatExpansionModule,
    ],
    exports: [
        MenuDetailsComponent,
        MenuCategoryComponent, 
        MenuItemComponent, 
        MenuOptionComponent, 
        TemplateMenuComponent,
        RestaurantCardListComponent,
        ExtraOptionListComponent,
        AddMenuCategoryComponent
    ],
    providers: [
        MenuService
    ]
})
export class RestaurantMenuModule {}

