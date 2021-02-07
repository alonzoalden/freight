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
import { ItemService } from './item.service';
import { ItemListComponent } from './component/item-list/item-list.component';
import { ItemDetailsSidebarComponent } from './component/sidebars/item-details/item-details.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ItemShellComponent } from './container/item-shell.component';
import { EditItemDialogComponent } from './component/edit-item/edit-item-dialog.component';
import { ItemRoutingModule } from './item-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { itemReducer } from './state/item.reducer';
import { ItemEffects } from './state/item.effect';

const routes: Routes = [];

@NgModule({
  declarations: [
    ItemShellComponent,
    ItemListComponent,
    ItemDetailsSidebarComponent,
    EditItemDialogComponent
  ],
  imports: [
    RouterModule.forChild(routes),
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
    ItemRoutingModule,
    StoreModule.forFeature('item', itemReducer),
    EffectsModule.forFeature([ItemEffects])
  ],
  providers: [
    ItemService,
    MatSnackBar
  ],
  entryComponents: [
    EditItemDialogComponent,
  ]
})
export class ItemModule {
}
