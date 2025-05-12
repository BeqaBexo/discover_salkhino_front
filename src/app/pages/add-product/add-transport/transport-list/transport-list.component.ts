import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransportService } from '../transport-service.service';
import { Transport } from '../../add-product-service/add-service.model';

@Component({
  selector: 'app-transport-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transport-list.component.html',
  styleUrls: ['./transport-list.component.scss']
})
export class TransportListComponent implements OnInit {
  transports: Transport[] = [];

  @Output() edit = new EventEmitter<Transport>();

  constructor(private transportService: TransportService) {}

  ngOnInit(): void {
    this.loadTransports();
  }

  loadTransports(): void {
    this.transportService.getTransports().subscribe({
      next: (data) => (this.transports = data),
      error: (err) => console.error('Loading error:', err)
    });
  }

  deleteTransport(id: number): void {
  if (confirm('ნამდვილად გსურს ჩანაწერის წაშლა?')) {
    this.transportService.deleteTransport(id).subscribe({
      next: () => this.loadTransports(), // ხელახლა ტვირთავს მხოლოდ აქტიურებს
      error: (err) => console.error('Delete error:', err)
    });
  }
}


  editTransport(item: Transport): void {
    this.edit.emit(item);
  }
}
