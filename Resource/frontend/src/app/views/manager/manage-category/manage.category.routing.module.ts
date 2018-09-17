import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryListComponent } from './category.list.component';
import { CategoryEditorComponent } from './category.editor.component';

const routes: Routes = [
  {
    path: 'list',
    component: CategoryListComponent,
    data: {
      title: 'Danh sách danh mục thực đơn'
    }
  },
  {
    path: 'edit/:id',
    component: CategoryEditorComponent,
    data: {
      title: 'Sửa danh mục thực đơn'
    }
  },
  {
    path: 'create',
    component: CategoryEditorComponent,
    data: {
      title: 'Tạo danh mục thực đơn'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageCategoryRoutingModule { }
