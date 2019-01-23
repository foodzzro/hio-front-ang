import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminModule } from './admin/admin.module';
import { AdminGuard } from './app-commons/guards/admin.guard';
import { SharedProvidersModule } from './app-commons/admin/shared-providers.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AdminSharedModulesModule } from './app-commons/admin/admin-shared-module.module';

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    AdminLoginComponent
  ],
  imports: [
    BrowserModule,
    AdminSharedModulesModule,

    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxSpinnerModule,

    SharedProvidersModule.forRoot(),
    ToastrModule.forRoot(),
    ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production }),
    TranslateModule.forRoot({ 
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),

    AdminModule,
  ],
  providers: [AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { } 
