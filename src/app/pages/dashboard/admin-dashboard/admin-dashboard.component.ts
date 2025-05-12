// admin-dashboard.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransportViewComponent } from '../../add-product/add-transport/transport-view/transport-view.component';
import { HeaderComponent } from "../../../components/header/header.component";

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, TransportViewComponent, HeaderComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {
  activeTab: string = 'transport';

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
}