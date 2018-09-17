import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user.list.component';
import { UserEditorComponent } from './user.editor.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: 'list',
    component: UserListComponent,
    data: {
      title: 'Danh sách nhân viên'
    }
  },
  {
    path: 'edit/:id',
    component: UserEditorComponent,
    data: {
      title: 'Cập nhật nhân viên'
    }
  },
  {
    path: 'create',
    component: UserEditorComponent,
    data: {
      title: 'Tạo nhân viên'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageUserRoutingModule { }
