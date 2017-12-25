import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
// import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
// import { TabsModule } from 'ngx-bootstrap/tabs';
import { NAV_DROPDOWN_DIRECTIVES } from './admin-panel/shared/nav-dropdown.directive';

import { SIDEBAR_TOGGLE_DIRECTIVES } from './admin-panel/shared/sidebar.directive';
import { BreadcrumbsComponent } from './admin-panel/shared/breadcrumb.component';

// Routing Module
import { AppRoutingModule } from './app.routing';

// Layouts
import { AdminLayoutComponent } from './admin-panel/layouts/admin-layout.component';
import { AlertComponent } from './_directives/index';
import { LoginComponent } from './login/login.component';

import { customHttpProvider } from './_helpers/index';
import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService, AppService ,SettingService} from './_services/index';
import { WebLayoutComponent } from './web/web-layout/web-layout.component';


@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    // BsDropdownModule.forRoot(),
    // TabsModule.forRoot(),
    HttpModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AlertComponent,
    LoginComponent,
    NAV_DROPDOWN_DIRECTIVES,
    BreadcrumbsComponent,
    SIDEBAR_TOGGLE_DIRECTIVES,
    WebLayoutComponent
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    AppService,
    customHttpProvider,
    AuthGuard,
    AlertService,
    AuthenticationService,
    SettingService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
