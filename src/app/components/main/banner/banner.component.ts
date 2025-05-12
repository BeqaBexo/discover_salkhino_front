import { Component, OnInit, OnDestroy } from '@angular/core';
import { BannerSlideService } from './banner-slide.service';
import { Subscription, interval } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit, OnDestroy {
  slides: any[] = [];
  currentSlide = 0;
  autoSlideSubscription: Subscription | null = null;

  constructor(private bannerSlideService: BannerSlideService) {}

  ngOnInit(): void {
    this.bannerSlideService.getAllBannerSlides().subscribe(data => {
      this.slides = data.map(item => ({
        image: item.filePath
          ? `https://localhost:7237/uploads/${item.filePath}`
          : 'assets/no-image.jpg',
        title: item.titleText,
        description: item.summaryText
      }));

      // Auto-slide only after slides are loaded
      this.startAutoSlide();
    });
  }

  ngOnDestroy(): void {
    // Stop auto-slide when component is destroyed
    this.stopAutoSlide();
  }

  startAutoSlide(): void {
    this.autoSlideSubscription = interval(5000).subscribe(() => {
      this.nextSlide();
    });
  }

  stopAutoSlide(): void {
    if (this.autoSlideSubscription) {
      this.autoSlideSubscription.unsubscribe();
      this.autoSlideSubscription = null;
    }
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
  }
}
