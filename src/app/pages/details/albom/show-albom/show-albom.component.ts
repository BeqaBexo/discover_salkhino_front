import { Component, OnInit } from '@angular/core';
import { AlbomService } from '../service/albom.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../../../components/header/header.component";
import { environment } from '../../../../../environments/environment';


@Component({
  standalone: true,
  selector: 'app-show-albom',
  imports: [CommonModule, HeaderComponent],
  templateUrl: './show-albom.component.html',
  styleUrls: ['./show-albom.component.scss']
})
export class ShowAlbomComponent implements OnInit {
  alboms: any[] = [];
  enlargedImage: string | null = null;

  constructor(private albomService: AlbomService) {}

  ngOnInit(): void {
    this.fetchAlboms();
  }

  openImage(url: string): void {
    this.enlargedImage = url;
  }

  closeImage(): void {
    this.enlargedImage = null;
  }

  fetchAlboms(): void {
    this.albomService.getAllAlboms().subscribe({
      next: (alboms) => {
        this.alboms = alboms.map((item: any) => {
          const firstImage = Array.isArray(item.imagePaths)
            ? item.imagePaths[0]
            : item.filePath;
          return {
            ...item,
            imageUrl: firstImage
              ? `${environment.apiUrl}/uploads/${firstImage}` 
              : 'assets/no-image.jpg'
          };
        });
      },
      error: (err) => console.error('Error fetching alboms:', err)
    });
  }
}
