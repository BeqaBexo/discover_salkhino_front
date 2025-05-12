import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTransportComponent } from '../add-transport.component';
import { TransportListComponent } from '../transport-list/transport-list.component';
import { Transport } from '../../add-product-service/add-service.model';

@Component({
  selector: 'app-transport-view',
  standalone: true,
  imports: [CommonModule, AddTransportComponent, TransportListComponent],
  templateUrl: './transport-view.component.html',
  styleUrls: ['./transport-view.component.scss']
})
export class TransportViewComponent {
  viewMode: 'add' | 'list' = 'list';
  selectedTransport: Transport | null = null;

  switchToAdd(): void {
    this.viewMode = 'add';
    this.selectedTransport = null;
  }

  editTransport(item: Transport): void {
    this.selectedTransport = item;
    this.viewMode = 'add';
  }
}
