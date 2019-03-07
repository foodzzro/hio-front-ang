import { Component, OnChanges, Input, OnInit, Output, EventEmitter, SimpleChanges } from "@angular/core";
import { RestaurantDeliveryZoneModel } from "../../models/DeliveryZoneModel";
import { RestaurantDetailsService } from "../services/restaurant-details.service";

@Component({
    selector: 'edit-delivery-area',
    templateUrl: './edit-delivery-area.component.html',
    styleUrls: ['./delivery-area.component.css']
  })
export class EditDeliveryAreaComponent implements OnInit, OnChanges {

  @Input()
  restaurantId: string;

  @Input()
  deliveryZone: RestaurantDeliveryZoneModel;

  @Input()
  collapsed: any;

  @Output()
  changeZone: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  removed: EventEmitter<any> = new EventEmitter<any>();

  isCollapsed: boolean = false;

  constructor(
    private restaurantService: RestaurantDetailsService
  ) {}

  ngOnInit() {
    
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.isCollapseChange(changes)) {
      this.isCollapsed = !changes.collapsed.currentValue;
    }
  }
  
  isCoordinatesChange(changes: SimpleChanges) {
    return changes.deliveryZone && changes.deliveryZone.currentValue !== changes.deliveryZone.previousValue;
  }

  isCollapseChange(changes: SimpleChanges) {
    return changes.collapsed && changes.collapsed.currentValue !== changes.collapsed.previousValue;
  }

  selectZone() {
    this.isCollapsed = !this.isCollapsed;
    if (this.isCollapsed) {
      this.changeZone.emit(this.deliveryZone);
    } else {
      this.changeZone.emit(null);
    }
   
  }

  async save() {
    try {
      const result = await this.restaurantService.updateDeliveryZone(this.restaurantId, this.deliveryZone);
    } catch (error) {
      //TODO
    }
  }

  async remove(id: string) {
    await this.restaurantService.deleteDeliveryZone(id);
    this.removed.emit(id);
  }

}