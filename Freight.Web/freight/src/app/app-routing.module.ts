import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './_general/home.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './_general/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'myaccount',
        loadChildren: () =>
          import('./myaccount/my-account.module').then(m => m.MyAccountModule)
      }
    ]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
