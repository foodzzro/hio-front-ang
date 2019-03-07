import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { BaseMenuComponent } from "../../base-menu.component";
import { MenuCategoryModel } from "../../models/menu-category.model";
import { MenuService } from "../../services/menu.service";
import { NotifyService } from "src/app/app-commons/notify.service";
import { ActivatedRoute } from "@angular/router";


@Component({
    selector: 'add-menu-category',
    templateUrl: './add-menu-category.component.html',
    styleUrls: ['./menu-category.component.scss']
  })
  export class AddMenuCategoryComponent extends BaseMenuComponent {

    @Output()
    save: EventEmitter<MenuCategoryModel> = new EventEmitter<MenuCategoryModel>();

    menuCategory: MenuCategoryModel;
    restaurantId: string;
    isAddCategoryCollapsed: boolean = false;

    constructor(
      private menuService: MenuService,
      private notifyService: NotifyService,
      protected route: ActivatedRoute
    ) { 
      super(route); 
      this.menuCategory = new MenuCategoryModel(null);
      this.restaurantId = this.getRestaurantId();
    }

    async saveMenuCategory() {
      const result = await this.menuService.saveMenuCategory(this.menuCategory, this.restaurantId);
      if (result) {
        this.notifyService.success('admin.menu.success_save');
        this.isAddCategoryCollapsed = !this.isAddCategoryCollapsed;
        this.save.emit(new MenuCategoryModel(result));
        this.menuCategory = new MenuCategoryModel(null);
      }
    }
  } 
  