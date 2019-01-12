import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotifyService } from 'src/app/app-commons/notify.service';
import { LoginService } from 'src/app/app-commons/login.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/app-commons/helpers/local-storage.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  form:FormGroup;
  emailValidatorPattern:string = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.%_-]{2,99}$';
  constructor(
    private fb: FormBuilder,
    private notify: NotifyService,
    private loginService: LoginService,
    private store: LocalStorageService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.store.clear();
    this.form = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(this.emailValidatorPattern)])],
      password: ['', Validators.required]
    });
  }

 
  isFieldInvalid(field: string) {
    if(this.form.get(field).value.length > 0) {
      return (
        (!this.form.get(field).valid && this.form.get(field).touched) ||
        (this.form.get(field).untouched)
      );
    } else {
      return false;
    }
    
  }

  onSubmit() {
    if (this.form.valid) {
      this.login();
    } else {
      this.notify.error("Date de authentificare sunt invalide");
    }
  }

  async login() {
    let result:any = await this.loginService.login(this.form.get("email").value, this.form.get("password").value);
    if(result) {
      let user = {
        token: result.token,
        email: result.email,
        roles: result.roles
      }
      this.store.set("user", user);
      this.router.navigateByUrl("/app/admin");
    }
  }

}
