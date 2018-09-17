import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppHttpInterceptor } from './AppHttpInterceptor';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { CarouselModule } from 'ngx-bootstrap';



const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent, CustomerLayoutComponent } from './containers';

import { P403Component } from './views/error/403.component';
import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { ModalModule } from 'ngx-bootstrap';

const APP_CONTAINERS = [
  DefaultLayoutComponent,
  CustomerLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular'

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { HomepageComponent } from './views/homepage/homepage.component';
import { CustomerProfileComponent } from './views/customer-profile/customer.profile.component';
import { HomepagedetailComponent } from './views/homepage/homepagedetail/homepagedetail.component';
import { LogoutComponent } from './views/logout/logout.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AboutusComponent } from './views/aboutus/aboutus.component';
import { OrderStatusComponent } from './views/chef/order.status.component';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction'

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAHe22jMnq2s2BaZx2yFvlYSWOxdhAIZlQ'
    }),
    AgmDirectionModule,
    ChartsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,    
    NgxDatatableModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    CarouselModule.forRoot()
  ],
  declarations: [
    AppComponent,
    APP_CONTAINERS,
    P403Component,
    P404Component,
    P500Component,
    LoginComponent,
    RegisterComponent,
    CustomerProfileComponent,
    HomepageComponent,
    HomepagedetailComponent,
    LogoutComponent,
    AboutusComponent,
    OrderStatusComponent
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AppHttpInterceptor,
    multi: true
  }],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
