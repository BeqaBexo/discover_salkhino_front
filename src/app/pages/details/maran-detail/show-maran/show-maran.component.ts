import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaranService } from '../service/maran.service';
import { SearchBarComponent } from '../../../../components/search-bar/search-bar.component';
import { PaginationComponent } from '../../../../components/pagination/pagination.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from "../../../../components/header/header.component";

@Component({
  selector: 'app-show-maran',
  standalone: true,
  imports: [CommonModule, FormsModule, SearchBarComponent, PaginationComponent, RouterModule, HeaderComponent],
  templateUrl: './show-maran.component.html',
  styleUrls: ['./show-maran.component.scss']
})
export class ShowMaranComponent implements OnInit {
  marans: any[] = [];
  filteredMarans: any[] = [];
  pagedMarans: any[] = [];
  searchQuery: string = '';
  selectedGrape: string = '';
  selectedLocation: string = '';
  grapeVarieties: string[] = [];
  locations: string[] = [];
  itemsPerPage: number = 12;

  constructor(private maranService: MaranService) {}

  ngOnInit(): void {
    this.fetchMarans();
  }

  fetchMarans(): void {
    this.maranService.getAllMarans().subscribe({
      next: (data) => {
        this.marans = data.map(m => {
          const firstImage = Array.isArray(m.imagePaths) ? m.imagePaths[0] : m.filePath;
          return {
            ...m,
            imageUrl: firstImage ? `https://localhost:7237/uploads/${firstImage}` : 'assets/no-image.jpg'
          };
        });

        this.extractDropdownValues();
        this.filterMarans();
      },
      error: (err) => console.error('Error:', err)
    });
  }

  extractDropdownValues(): void {
    this.grapeVarieties = [...new Set(this.marans.map(m => m.grapeVariety))];
    this.locations = [...new Set(this.marans.map(m => m.location))];
  }

  onSearchChange(query: string): void {
    this.searchQuery = query;
    this.filterMarans();
  }

  filterMarans(): void {
    this.filteredMarans = this.marans.filter(m => {
      const matchesSearch = this.searchQuery === '' ||
        m.grapeVariety.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        m.factoryName.toLowerCase().includes(this.searchQuery.toLowerCase());

      const matchesGrape = !this.selectedGrape || m.grapeVariety === this.selectedGrape;
      const matchesLocation = !this.selectedLocation || m.location === this.selectedLocation;

      return matchesSearch && matchesGrape && matchesLocation;
    });

    this.updatePagination(1);
  }

  updatePagination(page: number): void {
    const start = (page - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.pagedMarans = this.filteredMarans.slice(start, end);
  }

  onPageChange(items: any[]): void {
    this.pagedMarans = items;
  }
}
