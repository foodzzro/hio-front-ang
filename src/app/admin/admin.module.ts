import { NgModule } from '@angular/core';

import { DefaultLayoutComponent } from './default-layout/default-layout.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminLayoutModule } from '../app-commons/admin/admin-layout.module';
import { MapLoaderService } from '../app-commons/map-loader.service';

@NgModule({
  declarations: [
    DefaultLayoutComponent,
  ],
  imports: [
    AdminRoutingModule,   
    AdminLayoutModule
  ],
  providers: [MapLoaderService]
})
export class AdminModule { }
 