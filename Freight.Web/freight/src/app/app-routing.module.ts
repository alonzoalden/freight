import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './_general/home.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './_general/page-not-found.component';
import { PasswordAssistanceComponent } from './_general/password-assistance.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'password-assistance', component: PasswordAssistanceComponent },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'myaccount',
        loadChildren: () =>
          import('./myaccount/my-account.module').then(m => m.MyAccountModule)
      },
      {
        path: 'item',
        loadChildren: () =>
          import('./item/item.module').then(m => m.ItemModule)
      },
      {
        path: 'item/:filter',
        loadChildren: () =>
          import('./item/item.module').then(m => m.ItemModule)
      },
    ]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
