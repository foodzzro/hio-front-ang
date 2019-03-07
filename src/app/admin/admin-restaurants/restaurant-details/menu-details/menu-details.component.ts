import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MenuService } from './services/menu.service';
import { ActivatedRoute } from '@angular/router';
import { MenuCategoryModel } from './models/menu-category.model';

@Component({
  selector: 'app-menu-details',
  templateUrl: './menu-details.component.html',
  styleUrls: ['./menu-details.component.scss']
})
export class MenuDetailsComponent implements OnInit {

  isMenuColapse:Boolean = false;
  isRestaurantColapse:Boolean = false;

  menuItems: any = [];

  constructor(
    private menuService: MenuService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getMenuItems();
  } 

  async getMenuItems() {
    const restaurantId = this.route.snapshot.params.id;
    this.menuItems = await this.menuService.getMenuCategoryItesm(restaurantId);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.menuItems, event.previousIndex, event.currentIndex);
  }

  onSaveMenuCategory(menuCategory: MenuCategoryModel) {
    this.menuItems.unshift(menuCategory);
  }

  onRemoveMenu(id: string) {
    this.menuItems = this.menuItems.filter( (el: MenuCategoryModel) => el.id !== id);
  }

}
