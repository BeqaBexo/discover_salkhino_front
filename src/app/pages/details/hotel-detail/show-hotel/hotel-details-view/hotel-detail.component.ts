import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotelDetailService } from '../../service/hotel-detail-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../../../../components/header/header.component';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from '../../../../../../environments/environment';


@Component({
  standalone: true,
  selector: 'app-hotel-detail',
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.scss']
})
export class HotelDetailComponent implements OnInit {
  hotel: any;
  selectedImage: string | null = null;
  currentImageIndex: number = 0;

  constructor(
    private route: ActivatedRoute,
    private hotelService: HotelDetailService,
    private location: Location,
    private router: Router
  ) {}


goBack(): void {
  if (window.history.length > 1) {
    this.location.back();
  } else {
    this.router.navigate(['/show-hotel']);
  }
}


  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.hotelService.getHotelById(+id).subscribe({
        next: (res) => {
          this.hotel = {
            ...res,
            imagePaths: res.imagePaths || [],
            imageUrl: res.filePath
              ? `${environment.apiUrl}/uploads/${res.filePath}` 
              : 'assets/no-image.jpg'
          };
        },
        error: (err) => console.error('Error loading hotel:', err)
      });
    }
  }

  openLightbox(path: string, index: number): void {
    this.selectedImage = path;
    this.currentImageIndex = index;
  }

  closeLightbox(): void {
    this.selectedImage = null;
  }

  previousImage(): void {
    if (this.hotel?.imagePaths && this.currentImageIndex > 0) {
      this.currentImageIndex--;
      this.selectedImage = this.hotel.imagePaths[this.currentImageIndex];
    }
  }

  nextImage(): void {
    if (
      this.hotel?.imagePaths &&
      this.currentImageIndex < this.hotel.imagePaths.length - 1
    ) {
      this.currentImageIndex++;
      this.selectedImage = this.hotel.imagePaths[this.currentImageIndex];
    }
  }
}
