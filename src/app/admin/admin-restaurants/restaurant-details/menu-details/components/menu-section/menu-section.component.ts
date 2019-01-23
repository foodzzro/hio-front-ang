import { Component, OnInit, Input } from '@angular/core';
import { BaseMenuComponent } from '../../base-menu.component';

@Component({
  selector: 'app-menu-section',
  templateUrl: './menu-section.component.html',
  styleUrls: ['./menu-section.component.scss']
})
export class MenuSectionComponent extends BaseMenuComponent implements OnInit {

  @Input()
  menu:any; 
  isRestaurantCollapsed:boolean;

  constructor() { 
    super();
  }

  ngOnInit() {
  }


}
