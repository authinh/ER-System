import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderListComponent } from './order.list.component';

const routes: Routes = [
  {
    path: ':id',
    component: OrderListComponent,
    data: {
      title: 'Danh sách đặt món'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageOrderRoutingModule { }
