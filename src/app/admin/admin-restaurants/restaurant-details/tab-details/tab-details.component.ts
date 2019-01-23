import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-tab-details',
  templateUrl: './tab-details.component.html',
  styleUrls: ['./tab-details.component.css']
})
export class TabDetailsComponent implements OnInit {

  restaurantDetailsForm:FormGroup;

  constructor(
    private fb:FormBuilder
  ) {
    this.restaurantDetailsForm = this.generateFormGroup(fb);
   }

  ngOnInit() {
  }

  private generateFormGroup(fb:FormBuilder) {
    return fb.group({
      name: ['', Validators.required],
      min_order: ['', Validators.compose([Validators.required, Validators.pattern('^(0|[1-9][0-9]*)$')])],
      delivery_med_time: ['', Validators.required],
      delivery_std_tax: ['', Validators.compose([Validators.required, Validators.pattern('^(0|[1-9][0-9]*)$')])],
      delivery_free_ship: ['', Validators.compose([Validators.required, Validators.pattern('^(0|[1-9][0-9]*)$')])],
      email_alert: ['', Validators.email]
    });
  }

  saveRestaurantDetails() {
    if(this.restaurantDetailsForm.valid) {
      console.log(this.restaurantDetailsForm)
    } else {
      //TO DO
      this.triggerRequiredValidations()
    }
  }

  triggerRequiredValidations() {
    const formGroup:any = this.restaurantDetailsForm;
    for(let item of Object.keys(formGroup.controls)) {
      if( this.isFormGroupRequired(formGroup, item) ) {
        this.restaurantDetailsForm.controls[item].updateValueAndValidity({ onlySelf: true, emitEvent: true });
      }
    }
    console.log(this.restaurantDetailsForm);
  }

  isFormGroupRequired(formGroup, item) {
    return formGroup.controls[item].errors != null && formGroup.controls[item].errors.required;
  }

}
