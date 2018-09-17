// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ManageFoodRoutingModule } from './manage.food.routing.module';
import { ManageFoodComponent } from './manage.food.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ModalModule } from 'ngx-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FoodEditorComponent } from './food.editor.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    ManageFoodRoutingModule,
    NgSelectModule,
    ModalModule.forRoot(),
    ToastrModule.forRoot()
  ],
  declarations: [
    ManageFoodComponent,
    FoodEditorComponent
  ]
})
export class ManageFoodModule { }
