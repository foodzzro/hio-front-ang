import { ActivatedRoute } from "@angular/router";


export class BaseMenuComponent {

  constructor(protected route: ActivatedRoute) {}

  collapsed(event: any): void {
    // console.log(event);
  }

  expanded(event: any): void {
    // console.log(event);
  }

  getRestaurantId() {
    return this.route.snapshot.params.id;
  }

}