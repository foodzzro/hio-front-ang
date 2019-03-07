import { Component, OnInit, Input } from '@angular/core';
import { BaseMenuComponent } from '../../base-menu.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent extends BaseMenuComponent implements OnInit {

  isMenuColapse:boolean;

  constructor(
    protected route: ActivatedRoute
  ) { 
    super(route);
  }

  ngOnInit() {
  }

}
