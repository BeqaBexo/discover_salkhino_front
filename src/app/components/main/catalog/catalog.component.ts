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


}
