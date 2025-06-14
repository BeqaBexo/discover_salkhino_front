import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChildren,
  QueryList,
  ElementRef,
  Inject,
  PLATFORM_ID
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { StoryService } from './story.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-maran',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './maran.component.html',
  styleUrl: './maran.component.scss',
})
export class MaranComponent implements OnInit, AfterViewInit {
  stories: any[] = [];
  expandedId: number | null = null;

  @ViewChildren('cardRef') cardRefs!: QueryList<ElementRef>;

  constructor(
    private storyService: StoryService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.fetchStories();
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      this.cardRefs.forEach(card => {
        observer.observe(card.nativeElement);
      });
    }
  }

  fetchStories(): void {
    this.storyService.getAllStories().subscribe({
      next: (stories) => {
        this.stories = stories.map((item: any) => {
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
      error: (err) => console.error('Error fetching stories:', err)
    });
  }

  toggleExpand(id: number): void {
    this.expandedId = this.expandedId === id ? null : id;
  }

  getStyledTitle(title: string): string {
    return title
      .split('')
      .map((char, index) =>
        index % 2 === 1
          ? `<span class="styled-letter">${char.toUpperCase()}</span>`
          : char
      )
      .join('');
  }
}
