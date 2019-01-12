import { AppAsideModule,AppHeaderModule,AppFooterModule,AppSidebarModule} from '@coreui/angular'; 
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [
        AppAsideModule,
        AppHeaderModule,
        AppFooterModule,
        AppSidebarModule,
        PerfectScrollbarModule
    ],
    exports:[
        AppAsideModule,
        AppHeaderModule,
        AppFooterModule,
        AppSidebarModule,
        PerfectScrollbarModule
    ],
    providers: []
})
export class AdminLayoutModule { } 