import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  @Input() items: any[] = []; // Accepts the full list of items
  @Input() itemsPerPageOptions: number[] = [12, 48, 148]; // Options for records per page
  @Output() paginatedItems = new EventEmitter<any[]>(); // Emits the current page data

  itemsPerPage: number = 12; // Default items per page
  currentPage: number = 1;

  ngOnInit() {
    this.updatePagination();
  }

  ngOnChanges() {
    this.updatePagination(); // Update when the input changes
  }

  updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    const currentItems = this.items.slice(startIndex, endIndex);
  
    // Emit the updated list
    this.paginatedItems.emit(currentItems);
  }
  
  onItemsPerPageChange(newItemsPerPage: number): void {
    this.itemsPerPage = newItemsPerPage;
    this.currentPage = 1; // Reset to the first page
    this.updatePagination(); // Recalculate and emit the updated list
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }


  updateItemsPerPage(event: any): void {
    const value = event.target.value; // Get the selected value
    this.itemsPerPage = +value; // Update itemsPerPage as a number
    this.updatePagination(); // Trigger pagination update
  }

  
  get totalPages(): number {
    return Math.ceil(this.items.length / this.itemsPerPage);
  }
}
