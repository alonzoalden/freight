import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemShellComponent } from './container/item-shell.component';
import { ItemListComponent } from './component/item-list/item-list.component';

const ITEM_ROUTES: Routes = [
  {
    path: '**',
    component: ItemShellComponent,
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
export class ItemRoutingModule { }
