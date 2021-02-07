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
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FuseSidebarModule } from '@fuse/components';
import { FuseSharedModule } from '@fuse/shared.module';

@NgModule({
  imports: [
    SharedModule,
    DashboardRoutingModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatRippleModule,
    MatSlideToggleModule,
    MatTableModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatRippleModule,
    MatSelectModule,
    MatToolbarModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatTabsModule,
    MatChipsModule,
    MatSnackBarModule,
    MatRadioModule,
    FuseSharedModule,
    FuseSidebarModule,
    StoreModule.forFeature('dashboard', dashboardReducer),
    EffectsModule.forFeature([DashboardEffects])
  ],
  declarations: [
    DashboardShellComponent,
    DashboardHomeComponent,
    DashboardBusinessComponent,
    
  ]
})

export class DashboardModule { }
