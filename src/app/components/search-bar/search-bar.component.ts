import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent implements OnChanges {

  @Input() placeholder: string = 'Search...';
  @Input() searchQuery: string = '';
  @Output() searchChange: EventEmitter<string> = new EventEmitter<string>();

  internalSearch: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchQuery']) {
      this.internalSearch = this.searchQuery;
    }
  }

  onInputChange() {
    this.searchChange.emit(this.internalSearch);
  }

  onSearchClick() {
    this.searchChange.emit(this.internalSearch);
  }
}
