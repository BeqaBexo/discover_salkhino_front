import { Component, OnInit } from '@angular/core';
import { GalleryService } from './service/gallery.service';
import { environment } from '../../../../environments/environment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { HeaderComponent } from '../../header/header.component';


@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  alboms: any[] = [];
  filteredAlboms: any[] = [];
  searchTerm: string = '';
  selectedType: string = '';
  selectedFormat: string = '';
  enlargedItem: any = null;

  constructor(private galleryService: GalleryService) {}

  ngOnInit(): void {
    this.fetchAlboms();
  }

  fetchAlboms(): void {
    this.galleryService.getAllAlboms().subscribe({
      next: (alboms) => {
        this.alboms = alboms.map((item: any) => {
          const firstImage = Array.isArray(item.imagePaths) ? item.imagePaths[0] : item.filePath;
          return {
            ...item,
            imageUrl: firstImage ? `${environment.apiUrl}/uploads/${firstImage}` : 'assets/no-image.jpg',
            type: item.type || 'უცნობი',
            format: item.format || 'სურათი',
            name: item.name || item.title || 'უსახელო'
          };
        });
        this.filteredAlboms = this.alboms;
      },
      error: (err) => console.error('Error fetching alboms:', err)
    });
  }

  filterMedia(): void {
    this.filteredAlboms = this.alboms.filter(item => {
      const matchesText = this.searchTerm ? item.name.toLowerCase().includes(this.searchTerm.toLowerCase()) : true;
      const matchesType = this.selectedType ? item.type === this.selectedType : true;
      const matchesFormat = this.selectedFormat ? item.format === this.selectedFormat : true;
      return matchesText && matchesType && matchesFormat;
    });
  }

  openImage(item: any): void {
    this.enlargedItem = item;
  }

  closeImage(): void {
    this.enlargedItem = null;
  }
}