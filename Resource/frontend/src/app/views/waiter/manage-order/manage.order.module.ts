import { ToastrModule } from 'ngx-toastr';
// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ManageOrderRoutingModule } from './manage.order.routing.module';
import { OrderListComponent } from './order.list.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {CarouselModule} from 'primeng/carousel';
import { ModalModule } from 'ngx-bootstrap';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import {TableModule} from 'primeng/table';

@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    ManageOrderRoutingModule,
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    CarouselModule,
    TableModule
  ],
  declarations: [
    OrderListComponent
  ]
})
export class ManageOrderModule { }
