import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToureDetailService } from '../service/toure-detail-service.service';
import { Toure, TranslateToure } from '../service/toure-detail-service.model';


@Component({
  selector: 'app-show-toure',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './show-toure.component.html',
  styleUrl: './show-toure.component.scss'
})
export class ShowToureComponent {

  translations: TranslateToure = new TranslateToure();
  displayedToures: Toure[] = []; 
  
   constructor(
      public toureDetailService: ToureDetailService,) {}
  
  
    ngOnInit(): void {
      this.toureDetailService.getTranslations('ka').subscribe({
        next: (result) => { this.translations = result; },
        error: (err) => { console.error('Error fetching translations:', err); },
      });
      this.fetchToure();
    }
  
    fetchToure(): void {
      this.toureDetailService.getAllToure().subscribe({
        next: (Toure) => {
          this.displayedToures = Toure.map((Toure) => ({
            ...Toure
          }));
        },
        error: (err) => console.error('Error fetching Toures:', err),
      });
    }  
}
