import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyAccountShellComponent } from './container/my-account-shell.component';

const MYACCOUNT_ROUTES: Routes = [
  {
    path: '**',
    component: MyAccountShellComponent
  }
];

@NgModule({
    imports: [RouterModule.forChild(MYACCOUNT_ROUTES)],
    exports: [RouterModule]
})
export class MyAccountRoutingModule { }
