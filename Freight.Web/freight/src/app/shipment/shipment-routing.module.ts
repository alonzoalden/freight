import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShipmentShellComponent } from './container/shipment-shell.component';

const ITEM_ROUTES: Routes = [
  {
    path: '**',
    component: ShipmentShellComponent,
    // children: [
    //   {
    //     path: '',
    //     component: ItemListComponent,
    //   },
    // ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(ITEM_ROUTES)],
  exports: [RouterModule]
})
export class ShipmentRoutingModule { }
