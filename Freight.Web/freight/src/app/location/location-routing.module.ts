import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocationShellComponent } from './container/location-shell.component';

const LOCATION_ROUTES: Routes = [
  {
    path: '**',
    component: LocationShellComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(LOCATION_ROUTES)],
  exports: [RouterModule]
})
export class LocationRoutingModule { }
