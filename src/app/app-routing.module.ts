import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminModule } from './admin/admin.module';
import { DefaultLayoutComponent } from './admin/default-layout/default-layout.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminGuard } from './app-commons/guards/admin.guard';


const routes: Routes = [
  {
    path: 'app',
    children: [
      {
        path: 'admin',
        component: DefaultLayoutComponent,
        data: {
          roles: ["ROLE_ADMIN"]
        },
        canActivate: [AdminGuard],
        loadChildren: () => AdminModule
      },
    ]
  },
  {
    path: "admin",
    component: AdminLoginComponent
  },
  {
    path: "login",
    component: AdminLoginComponent
  },
  {
    path: '',
    redirectTo: 'admin',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: `reload` })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
