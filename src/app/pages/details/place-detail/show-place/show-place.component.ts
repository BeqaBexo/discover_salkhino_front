import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Place, TranslatePlace } from '../service/place-detail-service.model';
import { PlaceService } from '../service/place-detail-service.service';
import { HeaderComponent } from "../../../../components/header/header.component";



@Component({
  selector: 'app-show-place',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './show-place.component.html',
  styleUrls: ['./show-place.component.scss']
})
export class ShowPlaceComponent implements OnInit {


places: Place[] = [];
  displayedPlaces: Place[] = []; // Paginated forums
  itemsPerPage: number = 5; // Default items per page
  translations: TranslatePlace = new TranslatePlace();

  constructor(
      public placeService: PlaceService,) {}

  ngOnInit(): void {
    this.placeService.getTranslations('ka').subscribe({
      next: (result) => { this.translations = result; },
      error: (err) => { console.error('Error fetching translations:', err); },
    });
    this.fetchTransport();
  }


  onPageChange(items: Place[]): void {
    this.displayedPlaces = items; 
  }

    expandArticle(place: Place): void {
      place.isActive = true;
    }
  
    collapseArticle(place: Place): void {
      place.isActive = false;
    }

    fetchTransport(): void {
      this.placeService.getAllPlace().subscribe({
        next: (Place) => {
          this.displayedPlaces = Place.map((Place) => ({
            ...Place
          }));
        },
        error: (err) => console.error('Error fetching Places:', err),
      });
    }  
  
}
