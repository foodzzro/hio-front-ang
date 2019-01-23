import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-extra-option-list',
  templateUrl: './extra-option-list.component.html',
  styleUrls: ['./extra-option-list.component.css']
})
export class ExtraOptionListComponent implements OnInit {

  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];

  constructor() { }

  ngOnInit() {
  }
 
}
 