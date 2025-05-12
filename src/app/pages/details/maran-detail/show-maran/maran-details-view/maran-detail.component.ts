import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaranService } from '../../service/maran.service';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../../../../../components/header/header.component";
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-maran-detail',
  standalone: true,
  imports: [FormsModule, CommonModule, HeaderComponent],
  templateUrl: './maran-detail.component.html',
  styleUrls: ['./maran-detail.component.scss']
})
export class MaranDetailViewComponent implements OnInit {
  maran: any;
  selectedImage: string | null = null;
  currentImageIndex: number = 0;

  constructor(
    private route: ActivatedRoute,
    private maranService: MaranService,
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
      this.maranService.getMaranById(+id).subscribe({
        next: (data) => {
          this.maran = {
            ...data,
            imagePaths: data.imagePaths || [],
            imageUrl: data.filePath
              ? `https://localhost:7237/uploads/${data.filePath}`
              : 'assets/no-image.jpg'
          };
        },
        error: (err) => console.error('Error loading maran:', err)
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
    if (this.maran?.imagePaths && this.currentImageIndex > 0) {
      this.currentImageIndex--;
      this.selectedImage = this.maran.imagePaths[this.currentImageIndex];
    }
  }

  nextImage(): void {
    if (
      this.maran?.imagePaths &&
      this.currentImageIndex < this.maran.imagePaths.length - 1
    ) {
      this.currentImageIndex++;
      this.selectedImage = this.maran.imagePaths[this.currentImageIndex];
    }
  }
}
