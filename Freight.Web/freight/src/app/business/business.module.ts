import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatRadioModule } from '@angular/material/radio';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BusinessListComponent } from './component/business-list/business-list.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BusinessShellComponent } from './container/business-shell.component';
import { EditBusinessDialogComponent } from './component/edit-business/edit-business-dialog.component';
import { BusinessRoutingModule } from './business-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { businessReducer } from './state/business.reducer';
import { BusinessEffects } from './state/business.effect';
import { BusinessService } from './business.service';

const routes: Routes = [];

@NgModule({
  declarations: [
    BusinessShellComponent,
    BusinessListComponent,
    EditBusinessDialogComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    MatProgressSpinnerModule,
    MatButtonModule,
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
    BusinessRoutingModule,
    StoreModule.forFeature('business', businessReducer),
    EffectsModule.forFeature([BusinessEffects])
  ],
  providers: [
    BusinessService,
    MatSnackBar
  ],
  entryComponents: [
    EditBusinessDialogComponent,
  ]
})
export class BusinessModule {
}
