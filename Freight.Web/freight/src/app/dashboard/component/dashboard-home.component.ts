import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BusinessEntity } from '../../_shared/model/business-entity';

@Component({
  selector: 'dashboard-home',
  templateUrl: './dashboard-home.component.html'
})

export class DashboardHomeComponent {
  @Input() businesses: BusinessEntity[];
  @Output() selected = new EventEmitter<BusinessEntity>();

  constructor() { }

  businessSelected(business: BusinessEntity): void {
    this.selected.emit(business);
  }
}
