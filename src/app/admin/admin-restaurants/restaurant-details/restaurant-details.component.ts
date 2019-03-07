import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { RestaurantDetailsModel } from '../models/RestaurantDetailsModel';

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.scss']
})
export class RestaurantDetailsComponent implements OnInit, OnDestroy {

  routeSubscriber: Subscription;
  restaurant: RestaurantDetailsModel;

  selectedTab: string;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.routeSubscriber = this.route.data.subscribe( (result:any) => {
      if (result.restaurant) {
        this.restaurant = new RestaurantDetailsModel(result.restaurant);
      }
    });
  }

  changeTab(tab: string) {
    this.selectedTab = tab;
  }

  ngOnDestroy() {
    this.routeSubscriber.unsubscribe();
  }
}
