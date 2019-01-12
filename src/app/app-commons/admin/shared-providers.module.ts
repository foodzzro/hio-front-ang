import { NgModule, ModuleWithProviders } from "@angular/core";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { CustomHttpInterceptor } from "../helpers/custom-http-interceptor";
import { NotifyService } from "../notify.service";
import { LocalStorageService } from "../helpers/local-storage.service";
import { LoginService } from "../login.service";

@NgModule({})
export class SharedProvidersModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedProvidersModule,
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: CustomHttpInterceptor,
          multi: true
        },
        LocalStorageService,
        LoginService,
        NotifyService
      ]
    };
  }
}