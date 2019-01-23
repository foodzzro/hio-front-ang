import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-template-menu',
  templateUrl: './template-menu.component.html',
  styleUrls: ['./template-menu.component.scss']
})
export class TemplateMenuComponent implements OnInit {

  panelOpenState:boolean;

  constructor() { }

  ngOnInit() {
  }

}
