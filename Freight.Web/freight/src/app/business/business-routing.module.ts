import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BusinessShellComponent } from './container/business-shell.component';

const LOCATION_ROUTES: Routes = [
  {
    path: '**',
    component: BusinessShellComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(LOCATION_ROUTES)],
  exports: [RouterModule]
})
export class BusinessRoutingModule { }
