import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss'
})
export class CatalogComponent {


  getRouterLink(serviceTitle: string): string {
    const path = '/' + serviceTitle.toLowerCase().replace(' ', '-');
    console.log('Navigating to:', path);  
    return path;
  }

  cardItems = [
  { label: 'სასტუმრო', icon: 'fas fa-hotel', link: 'hotel-detail' },
  { label: 'მარანი', icon: 'fas fa-wine-bottle', link: 'maran-detail' },
  { label: 'ტრანსპორტი', icon: 'fas fa-car', link: 'transport-detail' },
  { label: 'ისტორიები', icon: 'fas fa-newspaper', link: 'show-history' },
  { label: 'ფორუმი', icon: 'fas fa-comments', link: 'show-forume' }
];


}
