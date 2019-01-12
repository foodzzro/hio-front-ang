import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { navItems } from 'src/app/app-commons/admin/nav';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DefaultLayoutComponent implements OnInit {

  public navItems = navItems;
  public sidebarMinimized = false;

  constructor(
    private translate: TranslateService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  changeLanguage() {
    this.translate.use("en");
  }

  logout() {
    this.router.navigateByUrl("/admin");
  }

}
