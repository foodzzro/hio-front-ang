import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminUsersService } from '../admin-users.service';
import { NotifyService } from 'src/app/app-commons/notify.service';
import { UserEditHelper } from './user-edit.helper';

@Component({
  selector: 'app-admin-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  @Input() data:any = {};
  @Output() finish = new EventEmitter<any>(); 

  userForm:FormGroup; 
  saveNewUser:Boolean = true  
  role:any = {
    list: [],
    selected: ''
  }

  constructor(
    private fb:FormBuilder,
    private userService: AdminUsersService,
    private notify:NotifyService,
    private userEditHelper: UserEditHelper
  ) { 
    this.userForm = this.fb.group( {
      userEmail: ['', Validators.required],
      userFirstName: ['', Validators.required],
      userPassword: ['', Validators.required],
      userPhone: ['', Validators.required],
      userLastName: ['', Validators.required],
      active: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.role = this.userEditHelper.prepareRoles('');
  }

  ngOnChanges() {
    if(this.data) {
      this.saveNewUser = false;
      this.role = this.userEditHelper.prepareRoles(this.data);
      this.userEditHelper.prepareFormData(this.userForm, this.data);
    } else {
      this.saveNewUser = true;
    }
  }

  async saveUser() {
    let result;

    if (!this.userForm.valid && !this.saveNewUser) { 
      delete this.userForm.value.userPassword; 
    }

    if(this.saveNewUser) { this.userForm.controls.active.setValue(true)}

    if (this.userForm.valid && this.saveNewUser) {
      result = await this.userService.saveUser(this.userForm.value, this.role.selected);
    } else if (this.userForm.valid) {
      result = await this.userService.editUser(this.userForm.value, this.data.id, this.role.selected);
    } else {

      for(let item of Object.keys(this.userForm.controls)) {
        if( this.userForm.get(item).status == "INVALID" && this.userForm.get(item).errors.required) {
          this.notify.error(`${item} nu este completat`);
          return;
        }
      }
    }
    if(this.data == undefined) { this.data = result; }
    let returnData:any = this.userEditHelper.convertFormData(this.data, this.userForm);
    returnData.roles = [this.role.selected]; 
    this.finish.emit({ status: true, data: returnData});
  }

  registerOnChange() {

  }

}
  