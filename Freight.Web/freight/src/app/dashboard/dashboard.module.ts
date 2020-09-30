import { NgModule } from '@angular/core';

/* NgRx */
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../_shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';


import { dashboardReducer } from './state/dashboard.reducer';
import { DashboardEffects } from './state/dashboard.effect';

import { DashboardShellComponent } from './container/dashboard-shell.component';
import { DashboardHomeComponent } from './component/dashboard-home.component';
import { DashboardBusinessComponent } from './component/dashboard-business.component';

@NgModule({
  imports: [
    SharedModule,
    DashboardRoutingModule,
    StoreModule.forFeature('dashboard', dashboardReducer),
    EffectsModule.forFeature([DashboardEffects])
  ],
  declarations: [
    DashboardShellComponent,
    DashboardHomeComponent,
    DashboardBusinessComponent
  ]
})

export class DashboardModule { }
