import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BaseMenuComponent } from '../../base-menu.component';
import { MenuService } from '../../services/menu.service';
import { MenuCategoryModel } from '../../models/menu-category.model';
import { NotifyService } from 'src/app/app-commons/notify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu-category',
  templateUrl: './menu-category.component.html',
  styleUrls: ['./menu-category.component.scss']
})
export class MenuCategoryComponent extends BaseMenuComponent implements OnInit {

  @Input()
  menuCategory: MenuCategoryModel; 

  @Output()
  remove: EventEmitter<string> = new EventEmitter<string>()

  menuTitle: string;
  isRestaurantCollapsed:boolean;

  constructor(
    private menuService: MenuService,
    private notifyService: NotifyService,
    protected route: ActivatedRoute
  ) { 
    super(route);
  }

  ngOnInit() {
    this.menuTitle = this.menuCategory.name;
  }

  async save() {
    const restaurantId = this.getRestaurantId();
    const result = await this.menuService.saveMenuCategory(this.menuCategory, restaurantId);
    if (result) { 
      this.notifyService.success('admin.menu.success_save'); 
      this.menuTitle = this.menuCategory.name;
    }
  }

  async removeMenu() {
    await this.menuService.deleteMenuCategoryItem(this.menuCategory.id);
    this.notifyService.success('admin.menu.success_delete');
    this.remove.emit(this.menuCategory.id);
  }
}
