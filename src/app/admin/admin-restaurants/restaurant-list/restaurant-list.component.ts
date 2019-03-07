import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css']
})
export class RestaurantListComponent implements OnInit {

  restaurants:any = [ "rest 1", "rest 2", "rest 3", "rest 4"]

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.data.subscribe( data => {
      this.restaurants = data.restaurantList;
    })
  }

  isCollapsed: boolean = false;
  iconCollapse: string = 'icon-arrow-up';

  collapsed(event: any): void {
    // console.log(event);
  }

  expanded(event: any): void {
    // console.log(event);
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
    this.iconCollapse = this.isCollapsed ? 'icon-arrow-down' : 'icon-arrow-up';
  }

  goToDetails(evt: any) {
    if(evt.go && evt.id) {
      this.router.navigateByUrl(`app/admin/restaurant/details/${evt.id}`);
    } else {
      this.router.navigateByUrl(`app/admin/restaurant/details`);
    }
  }
}
