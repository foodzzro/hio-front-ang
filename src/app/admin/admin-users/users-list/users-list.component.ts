import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilterComponent } from 'src/app/app-commons/helpers/filter.component';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { AdminUsersService } from '../admin-users.service';
import { NotifyService } from 'src/app/app-commons/notify.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent extends FilterComponent implements OnInit {

  userType: string = "ROLE_CLIENT"
  userData: any;
  userToRemove: any;
  modalControl: any = {
    decisionMessage: "",
    closeDecision: false
  }
  p:any;

  constructor(
    private route: ActivatedRoute,
    public ngxSmartModalService: NgxSmartModalService,
    private adminUserService: AdminUsersService,
    private notify: NotifyService
  ) { super(); }

  ngOnInit() {
    this.route.data.subscribe((resolveData) => {
      this.data = resolveData.users;
      this.dataBkp = resolveData.users;
      this.filterUsersByRole(this.userType);

    });
  }

  filterUsersByRole(role) {
    this.userType = role;
    this.data = this.dataBkp;
    this.data = this.dataBkp.filter((value) => {
      return value.roles.find(el => el == this.userType);
    });
  }

  openAddModal() {
    this.ngxSmartModalService.getModal("userEditModal").open();
  }

  openEditModal(user) {
    this.userData = user;
    this.ngxSmartModalService.getModal("userEditModal").open();
  }

  async removeUser(user) {
    this.userToRemove = user;
    this.modalControl = {
      closeDecision: false,
      decisionMessage: "app.do-you-want-delete"
    }
  }

  async changeUserStatus(user) {
    user.active = !user.active;
    let result: any = await this.adminUserService.changeUserStatus(user);
    if (result.status) { this.notify.success(result.message); }
  }

  finished(evt) {
    console.log(this.dataBkp);

    if (evt.status) {
      this.ngxSmartModalService.getModal("userEditModal").close();
      let index = this.dataBkp.findIndex(el => el.id == evt.data.id);

      if (index > -1) {
        this.dataBkp[index] = evt.data;
      } else {
        this.dataBkp.push(evt.data);
      }
      this.dataBkp = [...this.dataBkp];
      this.filterUsersByRole(this.userType);
    }
  }


  async confirm(val) {

    if (val.opt) {
      let result = await this.adminUserService.deleteUser(this.userToRemove);
      if (result) {
        this.notify.success("admin.users.user_deleted");
        this.data = this.data.filter(el => el.id !== this.userToRemove.id)
      }
    }

    this.modalControl = {
      closeDecision: true,
      decisionMessage: "app.do-you-want-delete"
    }
  }
}
