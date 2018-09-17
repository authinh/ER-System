// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ManageUserRoutingModule } from './manage.user.routing.module';
import { UserListComponent } from './user.list.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ModalModule } from 'ngx-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { UserEditorComponent } from './user.editor.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    ManageUserRoutingModule,
    ModalModule.forRoot(),
    ToastrModule.forRoot()
  ],
  declarations: [
    UserListComponent,
    UserEditorComponent
  ]
})
export class ManageUserModule { }
