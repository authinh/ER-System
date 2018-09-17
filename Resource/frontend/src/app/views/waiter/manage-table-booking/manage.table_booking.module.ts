// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ManageTableBookingRoutingModule } from './manage.table_booking.routing.module';
import { ManageTableBookingListComponent } from './table_booking.list.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ModalModule } from 'ngx-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    ManageTableBookingRoutingModule,
    NgxSpinnerModule,
    ModalModule.forRoot(),
    ToastrModule.forRoot()
  ],
  declarations: [
    ManageTableBookingListComponent
  ]
})
export class ManageTableBookingModule { }
