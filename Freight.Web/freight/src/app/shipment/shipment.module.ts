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
import { ShipmentService } from './shipment.service';
//import { ItemListComponent } from './component/item-list/item-list.component';
//import { ItemDetailsSidebarComponent } from './component/sidebars/item-details/item-details.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
//import { ItemShellComponent } from './container/item-shell.component';
//import { EditItemDialogComponent } from './component/edit-item/edit-item-dialog.component';
import { ShipmentRoutingModule } from './shipment-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { shipmentReducer } from './state/shipment.reducer';
import { ShipmentEffects } from './state/shipment.effect';
import { ShipmentShellComponent } from './container/shipment-shell.component';
import { ShipmentListComponent } from './component/shipment-list/shipment-list.component';
import { EditShipmentDialogComponent } from './component/edit-shipment/edit-shipment-dialog.component';
import { EditShipmentPackagesDialogComponent } from './component/edit-shipment-packages/edit-shipment-packages-dialog.component';
import { EditShipmentFeesDialogComponent } from './component/edit-shipment-fees/edit-shipment-fees-dialog.component';
import { EditShipmentContactsDialogComponent } from './component/edit-shipment-contacts/edit-shipment-contacts-dialog.component';
import { EditShipmentLinesDialogComponent } from './component/edit-shipment-lines/edit-shipment-lines-dialog.component';
import { ChatPanelShipmentsComponent } from './component/chat-panel/chat-panel.component';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { StepsPreviewComponent } from './component/steps-preview/steps-preview.component';

const routes: Routes = [];

@NgModule({
  declarations: [
    ShipmentShellComponent,
    ShipmentListComponent,
    StepsPreviewComponent,
    EditShipmentDialogComponent,
    ChatPanelShipmentsComponent,
    EditShipmentPackagesDialogComponent,
    EditShipmentFeesDialogComponent,
    EditShipmentContactsDialogComponent,
    EditShipmentLinesDialogComponent
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
    MatDatepickerModule,
    FuseSharedModule,
    FuseSidebarModule,
    ShipmentRoutingModule,
    StoreModule.forFeature('shipment', shipmentReducer),
    EffectsModule.forFeature([ShipmentEffects])
  ],
  providers: [
    ShipmentService,
    MatSnackBar
  ],
  entryComponents: [
    EditShipmentDialogComponent,
    EditShipmentPackagesDialogComponent,
    EditShipmentFeesDialogComponent,
    EditShipmentContactsDialogComponent,
    EditShipmentLinesDialogComponent
  ]
})
export class ShipmentModule {
}
