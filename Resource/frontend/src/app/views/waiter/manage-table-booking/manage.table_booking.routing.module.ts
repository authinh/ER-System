import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageTableBookingListComponent } from './table_booking.list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: 'list',
    component: ManageTableBookingListComponent,
    data: {
      title: 'Quản lý đặt bàn'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageTableBookingRoutingModule { }
