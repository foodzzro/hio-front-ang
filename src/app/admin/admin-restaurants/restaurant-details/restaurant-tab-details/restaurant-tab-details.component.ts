import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { RestaurantDetailsModel } from '../../models/RestaurantDetailsModel';
import { RestaurantDetailsService } from '../services/restaurant-details.service';

@Component({
  selector: 'app-restaurant-tab-details',
  templateUrl: './restaurant-tab-details.component.html',
  styleUrls: ['./restaurant-tab-details.component.css']
})
export class TabDetailsComponent implements OnInit {

  @Input()
  restaurant:RestaurantDetailsModel;

  restaurantDetailsForm:FormGroup;
  deliveryTypes:any = RestaurantDetailsModel.deliveryTypes;
  cuisines:any = RestaurantDetailsModel.cuisines;
  paymentTypes = RestaurantDetailsModel.paymentMethods;

  constructor(
    private fb:FormBuilder,
    private restaurantService: RestaurantDetailsService
  ) {}

  ngOnInit() {
    this.restaurantDetailsForm = this.generateFormGroup(this.fb);
    if (this.restaurant) {
      this.restaurantDetailsForm.setValue(this.restaurant);
    } 
  }

  
  private generateFormGroup(fb:FormBuilder) {
    return fb.group({
      id: [''],
      name: ['', Validators.required],
      description: [''],
      min_order: ['', Validators.compose([Validators.required, Validators.pattern('^(0|[1-9][0-9]*)$')])],
      deliveryType: this.fb.group({
        id: [''],
        name: ['', Validators.required],
        freeDelivery: ['', Validators.required],
        mediumTime: ['', Validators.required],
        standardTax: ['', Validators.compose([Validators.required, Validators.pattern('^(0|[1-9][0-9]*)$')])],
        minDeliveryValue: ['', Validators.compose([Validators.pattern('^(0|[1-9][0-9]*)$')])],
      }),
      emailAddressAlert: ['', Validators.email],
      contactPhone: ['', Validators.pattern('^(0|[1-9][0-9]*)$')],
      cuisine: this.fb.group({
        id: [''],
        name: ['', Validators.required]
      }),
      address: new FormControl(''),
      city: new FormControl(''), 
      county: new FormControl(''),
      paymentType: new FormControl([], [Validators.required]),
      image_src: new FormControl(''),
      active: new FormControl(true)
    });
  }

  async saveRestaurantDetails() {
    if(this.restaurantDetailsForm.valid) {
      const restaurant = new RestaurantDetailsModel(this.restaurantDetailsForm.value);
      const result = await this.restaurantService.saveRestaurant(restaurant);
    } else {
      this.triggerRequiredValidations()
    }
  }

  triggerRequiredValidations() {
    const formGroup:any = this.restaurantDetailsForm;
    for(let item of Object.keys(formGroup.controls)) {
      if( this.isFormGroupRequired(formGroup, item) ) {
        this.restaurantDetailsForm.controls[item].markAsDirty();
        this.restaurantDetailsForm.controls[item].updateValueAndValidity({ onlySelf: true, emitEvent: true });
      }
      if (this.isControlFormGroup(item)) {
        this.triggerSubFormValidation(formGroup.controls[item]);
      }
    }
  }

  triggerSubFormValidation(form: any) {
    Object.keys(form.controls).map( (element) => {
      if (this.isFormGroupRequired(form, element)) {
        form.controls[element].markAsDirty();
        form.controls[element].updateValueAndValidity({ onlySelf: true, emitEvent: true });
      }
    });
  }

  isValidPaymentType() {
    return this.restaurantDetailsForm.dirty && !this.restaurantDetailsForm.controls.paymentType.valid;
  }

  isControlFormGroup(item: any) {
    return this.restaurantDetailsForm.controls[item] instanceof FormGroup
  }

  isPaymentExists(type: string) {
    return this.getFormControl("paymentType").value.includes(type);
  }

  isRestaurantActive() {
    return this.getFormControl("active").value;
  }

  isFormGroupRequired(formGroup: FormGroup, item: string) {
    return formGroup.controls[item].errors != null && formGroup.controls[item].errors.required;
  }

  getDeliveryTypeName(type) {
    return `admin.restaurant.delivery_type_list.${type}`;
  }

  getDeliveryTypeFormGroup() {
    return this.restaurantDetailsForm.controls.deliveryType;
  }

  getCuisineTypeFormGroup() {
    return this.restaurantDetailsForm.controls.cuisine;
  }

  onChangeActiveStatus(event: any) {
    this.getFormControl("active").setValue(event.target.checked);
  }

  onChangePaymentCard(event: any) {
    let payments = this.restaurantDetailsForm.controls.paymentType.value.filter( val => val !== event.target.value);
    if (event.target.checked) {
      payments.push(event.target.value);
      this.restaurantDetailsForm.controls.paymentType.setValue(payments);
    }
  }

  onChangePaymentCash(event: any) {
    let payments = this.restaurantDetailsForm.controls.paymentType.value.filter( val => val !== event.target.value);
    if (event.target.checked) {
      payments.push(event.target.value);
      this.restaurantDetailsForm.controls.paymentType.setValue(payments);
    }
  }

  getFormControl(control: string): AbstractControl {
    return this.restaurantDetailsForm.get(control);
  }
}
