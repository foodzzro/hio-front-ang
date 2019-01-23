import { Component, OnInit, Input } from '@angular/core';
import { BaseMenuComponent } from '../../base-menu.component';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent extends BaseMenuComponent implements OnInit {

  isMenuColapse:boolean;

  constructor() { 
    super();
  }

  ngOnInit() {
  }

}
