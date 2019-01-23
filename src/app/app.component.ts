import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SwUpdate } from '@angular/service-worker';
import { NotifyService } from './app-commons/notify.service';
import { NavigationStart, NavigationEnd, NavigationError, NavigationCancel, Event, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent {
  title = 'hio-front';

  constructor(private translate: TranslateService, updates: SwUpdate, notify: NotifyService, private router: Router, private spinner: NgxSpinnerService) {
    translate.setDefaultLang('ro');
    translate.use('ro');
 

    updates.available.subscribe((event: any) => {
      notify.successMessage("S-a instalat o noua versiune");
      console.log('availablef version is', event.available.appData.version);
    });
    updates.activated.subscribe(event => {
      console.log('oldf version was', event.previous);
      console.log('newf version is', event.current);
    });

    this.router.events.subscribe((routerEvent: Event) => {
      this.checkRouterEvent(routerEvent); 
    });
  }

  checkRouterEvent(routerEvent: Event): void {
    if (routerEvent instanceof NavigationStart) {
      this.spinner.show();
    }

    if (routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError) {
        this.spinner.hide();
    }
  }

}
