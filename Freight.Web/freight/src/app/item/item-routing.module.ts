import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemComponent } from './item.component';
import { ItemListComponent } from './item-list/item-list.component';

const ITEM_ROUTES: Routes = [
  {
    path: '**',
    component: ItemComponent,
    children: [
      {
        path: '',
        component: ItemListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(ITEM_ROUTES)],
  exports: [RouterModule]
})
export class ItemRoutingModule { }
