import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeeShellComponent } from './container/fee-shell.component';

const FEE_ROUTES: Routes = [
  {
    path: '**',
    component: FeeShellComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(FEE_ROUTES)],
  exports: [RouterModule]
})
export class FeeRoutingModule { }
