import { ToastrModule } from 'ngx-toastr';
// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ViewAvailableTableRoutingModule } from './manage.available_table.routing.module';
import { ViewAvailableTableComponent } from './available_table.list.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ModalModule } from 'ngx-bootstrap';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import {CalendarModule} from 'primeng/calendar';
import {CheckboxModule} from 'primeng/checkbox';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    ViewAvailableTableRoutingModule,
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    CheckboxModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
  ],
  declarations: [
    ViewAvailableTableComponent
  ]
})
export class ManageAvailableTableModule { }
