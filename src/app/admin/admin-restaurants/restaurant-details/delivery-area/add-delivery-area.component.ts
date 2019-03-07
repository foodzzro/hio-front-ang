
import { Component, OnChanges, OnInit, Input, SimpleChanges, Output, EventEmitter } from "@angular/core";
import { RestaurantDeliveryZoneModel } from "../../models/DeliveryZoneModel";
import { RestaurantDetailsService } from "../services/restaurant-details.service";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'add-delivery-area',
  templateUrl: './add-delivery-area.component.html',
  styleUrls: ['./delivery-area.component.css']
})
export class AddDeliveryAreaComponent implements OnInit, OnChanges {

  @Input()
  coordinates: any;

  @Input()
  restaurantId: string;

  @Input()
  collapsed: boolean;

  @Output()
  addZone: EventEmitter<boolean> = new EventEmitter<boolean>()

  @Output()
  completed: EventEmitter<RestaurantDeliveryZoneModel> = new EventEmitter<RestaurantDeliveryZoneModel>();

  delivery: RestaurantDeliveryZoneModel;
  isCollapsed: boolean = false;
  deliveryForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private restaurantService: RestaurantDetailsService
  ) {}

  ngOnInit() {
    this.delivery = new RestaurantDeliveryZoneModel();
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.isCoordinatesChange(changes)) {
      this.delivery.coordinates = JSON.stringify(changes.coordinates.currentValue);
    }
    if (this.isCollapsedChange(changes)) {
      this.isCollapsed = false;
    }
  }
  
  isCollapsedChange(changes: SimpleChanges) {
    return changes.collapsed && changes.collapsed.currentValue !== changes.collapsed.previousValue;
  }

  isCoordinatesChange(changes: SimpleChanges) {
    return changes.coordinates && changes.coordinates.currentValue !== changes.coordinates.previousValue;
  }

  isFormValid() {
    return this.deliveryForm.dirty && this.deliveryForm.valid;
  }

  triggerFormValidation(form: FormGroup) {
    Object.keys(form.controls).map( (element) => {
      if (this.isFormGroupRequired(form, element)) {
        form.controls[element].markAsDirty();
        form.controls[element].updateValueAndValidity({ onlySelf: true, emitEvent: true });
      }
    });
  }

  isFormGroupRequired(formGroup: FormGroup, item: string) {
    return formGroup.controls[item].errors != null && formGroup.controls[item].errors.required;
  }

  buildForm() {
    this.deliveryForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      charge: new FormControl('', [Validators.pattern('^(0|[1-9][0-9]*)$')])
    })
  }

  setDeliveryFormData() {
    this.delivery.name = this.deliveryForm.get('name').value;
    this.delivery.charge = this.deliveryForm.get('charge').value;
  }

  async add() {
    try {
      if (this.isFormValid()) {
        this.setDeliveryFormData();
        const result = await this.restaurantService.saveDeliveryZone(this.restaurantId, this.delivery);
        this.completed.emit(new RestaurantDeliveryZoneModel(result));
      } else {
        this.triggerFormValidation(this.deliveryForm);
      }
    } catch (error) {
      //TODO
    }
  }
  
  onAddZone() {
    this.addZone.emit(true);
  }

} 