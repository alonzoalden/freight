import { NgModule } from '@angular/core';
import { SharedModule } from '../_shared/shared.module';
import { MyAccountRoutingModule } from './my-account-routing.module';

import { MyAccountShellComponent } from './container/my-account-shell.component';
import { CompanyListComponent } from './component/company-list.component';

@NgModule({
  imports: [
    SharedModule,
    MyAccountRoutingModule
  ],
  declarations: [
    MyAccountShellComponent,
    CompanyListComponent
  ]
})

export class MyAccountModule { }
