import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from '../../../../components/pagination/pagination.component';
import { SearchBarComponent } from "../../../../components/search-bar/search-bar.component";
import { TranslateTransp } from '../../../add-product/add-product-service/add-service.model';
import { Service } from '../../../share/service.service';
import { TransportService } from '../service/transport-detail-service.service';
import { RouterModule } from '@angular/router';
import { Transport } from '../service/transport-detail-service.model';

@Component({
  selector: 'app-search-car',
  standalone: true,
  imports: [CommonModule, FormsModule, PaginationComponent, SearchBarComponent, RouterModule],
  templateUrl: './search-transport.component.html',
  styleUrls: ['./search-transport.component.scss'],
})
export class Searchtransportomponent implements OnInit {
  isLoading = false;
  translations: TranslateTransp = new TranslateTransp();

  transports: Transport[] = [];
  carList: Transport[] = [];
  selectedTransport: Transport | null = null;

  selectedRegion: string = '';
  selectedRentalType = { withDriver: false, withoutDriver: false };
  priceRange: number = 250;
  categories = [
    { name: 'სედანი', selected: false },
    { name: 'ჯიპი', selected: false },
    { name: 'კუპე', selected: false },
  ];

  searchQuery: string = '';
  itemsPerPage: number = 12;
  currentPage: number = 1;

  startDate: string = '';
  endDate: string = '';

  constructor(
    private srv: Service,
    private transportSrv: TransportService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.fetchTransport();
    this.srv.getTranslations('ka').subscribe({
      next: (result) => (this.translations = result),
      error: (err) => console.error('Error fetching translations:', err),
    });
  }

  fetchTransport(): void {
    this.transportSrv.getAllTransport().subscribe({
      next: (transports) => {
        this.transports = transports.map(t => {
          const firstImage = Array.isArray(t.imagePaths) ? t.imagePaths[0] : t.filePath;
          return {
            ...t,
            imageUrl: firstImage ? `https://localhost:7237/uploads/${firstImage}` : 'assets/no-image.jpg'
          };
        });

        this.filterCars(); // ❗ მოაქვს მონაცემი და ავტომატურად აჩვენებს
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching transports:', err);
        this.isLoading = false;
      }
    });
  }

  onSearchChange(query: string): void {
    this.searchQuery = query;
    this.filterCars();
  }

  filterCars(): void {
    const query = this.searchQuery?.toLowerCase().trim() || '';
    const selectedCategories = this.categories.filter(c => c.selected).map(c => c.name);
    const withDriver = this.selectedRentalType.withDriver;
    const withoutDriver = this.selectedRentalType.withoutDriver;

    const filtered = this.transports.filter(t => {
      const matchesText =
        !query ||
        t.manufacturer?.toLowerCase().includes(query) ||
        t.model?.toLowerCase().includes(query) ||
        t.price.toString().includes(query);

      const matchesPrice = t.price <= this.priceRange;
      const matchesRegion = !this.selectedRegion || t.location === this.selectedRegion;
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(t.category || '');
      const matchesRentalType =
        (!withDriver && !withoutDriver) ||
        (withDriver && t.rentalType === 'მძღოლით') ||
        (withoutDriver && t.rentalType === 'მძღოლის გარეშე');

      return matchesText && matchesPrice && matchesRegion && matchesCategory && matchesRentalType;
    });

    this.carList = filtered.slice(0, this.itemsPerPage); // paginate first page
  }

  onPageChange(items: Transport[]): void {
    this.carList = items;
  }
}
