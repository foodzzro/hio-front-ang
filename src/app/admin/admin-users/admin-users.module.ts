import { NgModule } from '@angular/core';
import { UsersListComponent } from './users-list/users-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdminUsersService } from './admin-users.service';
import { AdminUsersResolve } from './admin-users.resolve';
import { AdminUsersRoutingModule } from './admin-users-routing.module';
import { AdminSharedModulesModule } from 'src/app/app-commons/admin/admin-shared-module.module';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserEditHelper } from './user-edit/user-edit.helper';

@NgModule({
    declarations: [
        UsersListComponent, UserEditComponent, 
    ],
    imports: [
        AdminUsersRoutingModule,
        AdminSharedModulesModule,
        NgxPaginationModule
    ],
    providers: [AdminUsersService, AdminUsersResolve, UserEditHelper]
})
export class AdminUsersModule {}   