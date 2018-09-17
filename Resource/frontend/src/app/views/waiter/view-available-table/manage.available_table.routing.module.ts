import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewAvailableTableComponent } from './available_table.list.component';

const routes: Routes = [
  {
    path: '',
    component: ViewAvailableTableComponent,
    data: {
      title: 'Xem bàn trống'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewAvailableTableRoutingModule { }
