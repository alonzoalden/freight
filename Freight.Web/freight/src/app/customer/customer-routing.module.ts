import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerShellComponent } from './container/customer-shell.component';

const USER_ROUTES: Routes = [
  {
    path: '**',
    component: CustomerShellComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(USER_ROUTES)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
