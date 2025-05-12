import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HotelDetailService } from '../service/hotel-detail-service.service';
import { RouterModule } from '@angular/router';
import { PaginationComponent } from '../../../../components/pagination/pagination.component';
import { HeaderComponent } from "../../../../components/header/header.component";
import { Hotel } from '../service/hotel-detail-service.model';

@Component({
  selector: 'app-show-hotel',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    PaginationComponent,
    HeaderComponent
  ],
  templateUrl: './show-hotel.component.html',
  styleUrls: ['./show-hotel.component.scss']
})
export class ShowHotelComponent implements OnInit {
  hotels: Hotel[] = [];
  filteredHotels: Hotel[] = [];
  pagedHotels: Hotel[] = [];

  searchQuery: string = '';
  itemsPerPage: number = 12;

  constructor(private hotelService: HotelDetailService) {}

  ngOnInit(): void {
    this.fetchHotels();
  }

  fetchHotels(): void {
    this.hotelService.getAllHotel().subscribe({
      next: (data: Hotel[]) => {
        this.hotels = data;
        this.filterHotels();
      },
      error: (err) => console.error('Error loading hotels:', err)
    });
  }

  onSearchChange(query: string): void {
    this.searchQuery = query;
    this.filterHotels();
  }

 filterTitle: string = '';
filterPrice: number | null = null;

filterHotels(): void {
  const titleLower = this.filterTitle.toLowerCase();

  this.filteredHotels = this.hotels.filter(hotel => {
    const matchesTitle =
      !this.filterTitle ||
      hotel.title?.toLowerCase().includes(titleLower);

    const matchesPrice =
      this.filterPrice == null || hotel.price === this.filterPrice;

    return matchesTitle && matchesPrice;
  });

  this.updatePagination(1);
}


  updatePagination(page: number): void {
    const start = (page - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.pagedHotels = this.filteredHotels.slice(start, end);
  }

  onPageChange(items: Hotel[]): void {
    this.pagedHotels = items;
  }
}
