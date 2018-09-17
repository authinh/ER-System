// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CashierRoutingModule } from './cashier.routing.module';
import { CashierComponent } from './cashier.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ModalModule } from 'ngx-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CheckOutComponent } from './checkout.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    CashierRoutingModule,
    NgSelectModule,
    ModalModule.forRoot(),
    ToastrModule.forRoot()
  ],
  declarations: [
    CheckOutComponent,
    CashierComponent
  ]
})
export class CashierModule { }
