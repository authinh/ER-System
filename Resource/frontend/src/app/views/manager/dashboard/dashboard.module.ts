// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ModalModule } from 'ngx-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard.component';
import { DashboarbRoutingModule } from './dashboard.routing.module';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule,
    ReactiveFormsModule,
    DashboarbRoutingModule,
    NgxDatatableModule,
    ModalModule.forRoot(),
    ToastrModule.forRoot()
  ],
  declarations: [DashboardComponent
  ]
})
export class DashboardModule { }
