import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './_general/home.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './_general/page-not-found.component';
import { PasswordAssistanceComponent } from './_general/password-assistance.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './_general/auth/auth.guard';

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
        canLoad: [AuthGuard],
        loadChildren: () =>
          import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'myaccount',
        canLoad: [AuthGuard],
        loadChildren: () =>
          import('./myaccount/my-account.module').then(m => m.MyAccountModule)
      },
      {
        path: 'item',
        canLoad: [AuthGuard],
        loadChildren: () =>
          import('./item/item.module').then(m => m.ItemModule)
      },
      {
        path: 'item/:filter',
        canLoad: [AuthGuard],
        loadChildren: () =>
          import('./item/item.module').then(m => m.ItemModule)
      },
      {
        path: 'shipment',
        canLoad: [AuthGuard],
        loadChildren: () =>
          import('./shipment/shipment.module').then(m => m.ShipmentModule)
      },
      {
        path: 'shipment/:filter',
        canLoad: [AuthGuard],
        loadChildren: () =>
          import('./shipment/shipment.module').then(m => m.ShipmentModule)
      },
      {
        path: 'location',
        canLoad: [AuthGuard],
        loadChildren: () =>
          import('./location/location.module').then(m => m.LocationModule)
      },
      {
        path: 'location/:filter',
        canLoad: [AuthGuard],
        loadChildren: () =>
          import('./location/location.module').then(m => m.LocationModule)
      },
      {
        path: 'fee',
        canLoad: [AuthGuard],
        loadChildren: () =>
          import('./fee/fee.module').then(m => m.FeeModule)
      },
      {
        path: 'fee/:filter',
        canLoad: [AuthGuard],
        loadChildren: () =>
          import('./fee/fee.module').then(m => m.FeeModule)
      },
      {
        path: 'users',
        canLoad: [AuthGuard],
        loadChildren: () =>
          import('./user/user.module').then(m => m.UserModule)
      },
      {
        path: 'users/:filter',
        canLoad: [AuthGuard],
        loadChildren: () =>
          import('./user/user.module').then(m => m.UserModule)
      },
      {
        path: 'customers',
        canLoad: [AuthGuard],
        loadChildren: () =>
          import('./customer/customer.module').then(m => m.CustomerModule)
      },
      {
        path: 'customers/:filter',
        canLoad: [AuthGuard],
        loadChildren: () =>
          import('./customer/customer.module').then(m => m.CustomerModule)
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
