import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserShellComponent } from './container/user-shell.component';

const USER_ROUTES: Routes = [
  {
    path: '**',
    component: UserShellComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(USER_ROUTES)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
