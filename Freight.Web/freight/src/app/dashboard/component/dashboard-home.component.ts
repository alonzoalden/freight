import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BusinessEntity } from '../../_shared/model/business-entity';

@Component({
  selector: 'dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['../container/dashboard.component.scss'],
})

export class DashboardHomeComponent {
  @Input() businesses: BusinessEntity[];
  @Input() dashboardInfo: any;
  @Output() selected = new EventEmitter<BusinessEntity>();

  constructor() { }
  
  ngOnInit() {
  }

  businessSelected(business: BusinessEntity): void {
    this.selected.emit(business);
  }
}
