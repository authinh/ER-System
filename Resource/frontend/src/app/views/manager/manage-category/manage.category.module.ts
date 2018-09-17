import { ToastrModule } from 'ngx-toastr';
// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ManageCategoryRoutingModule } from './manage.category.routing.module';
import { CategoryListComponent } from './category.list.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ModalModule } from 'ngx-bootstrap';
import { CategoryEditorComponent} from './category.editor.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    ManageCategoryRoutingModule,
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  declarations: [
    CategoryListComponent,
    CategoryEditorComponent
  ]
})
export class ManageCategoryModule { }
