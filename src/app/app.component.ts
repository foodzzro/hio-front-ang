import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SwUpdate } from '@angular/service-worker';
import { NotifyService } from './app-commons/notify.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: []
})
export class AppComponent {
  title = 'hio-front';

  constructor(private translate: TranslateService, updates: SwUpdate, notify: NotifyService) {
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
  }

}
