import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardShellComponent } from './container/dashboard-shell.component';

const DASHBOARD_ROUTES: Routes = [
  {
    path: '**',
    component: DashboardShellComponent
  }
];

@NgModule({
    imports: [RouterModule.forChild(DASHBOARD_ROUTES)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
