import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Transport } from '../../service/transport-detail-service.model';
import { TransportService } from '../../service/transport-detail-service.service';
import { HeaderComponent } from "../../../../../components/header/header.component";
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transport-details-view',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './transport-details-view.component.html',
  styleUrls: ['./transport-details-view.component.scss']
})
export class TransportDetailsViewComponent implements OnInit {

  transport!: Transport;

  constructor(
    private route: ActivatedRoute,
    private transportService: TransportService,
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
      this.transportService.getTransportById(+id).subscribe({
        next: (res) => {
          this.transport = {
            ...res,
            imageUrl: res.filePath ? `https://localhost:7237/uploads/${res.filePath}` : 'assets/no-image.jpg'
          };
        },
        error: (err) => console.error('Transport not found:', err)
      });
    }
  }

  selectedImage: string | null = null;


currentImageIndex: number = 0;

// როცა დაკლიკდება პატარა ფოტო
openLightbox(path: string, index: number): void {
  this.selectedImage = path;
  this.currentImageIndex = index;
}



// გადახვევა მარცხნივ
previousImage(): void {
  if (this.transport?.imagePaths && this.currentImageIndex > 0) {
    this.currentImageIndex--;
    this.selectedImage = this.transport.imagePaths[this.currentImageIndex];
  }
}

// გადახვევა მარჯვნივ
nextImage(): void {
  if (this.transport?.imagePaths && this.currentImageIndex < this.transport.imagePaths.length - 1) {
    this.currentImageIndex++;
    this.selectedImage = this.transport.imagePaths[this.currentImageIndex];
  }
}

// დახურვა
closeLightbox(): void {
  this.selectedImage = null;
}



  formatDate(dateStr: string | undefined): string {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    return date.toLocaleDateString('ka-GE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
