import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckOutComponent } from './checkout.component';
import { CashierComponent } from './cashier.component';

const routes: Routes = [
  {
    path: '',
    component: CashierComponent,
    data: {
      title: 'Cashier'
    }
  },
  {
    path: 'checkout/:id',
    component: CheckOutComponent,
    data: {
      title: 'Checkout'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CashierRoutingModule { }
