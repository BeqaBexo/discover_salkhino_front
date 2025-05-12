import { Component, OnInit } from '@angular/core';
import { HistoryService } from '../service/history.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../../../components/header/header.component";


@Component({
  standalone: true,
  selector: 'app-show-history',
  imports: [CommonModule, HeaderComponent],
  templateUrl: './show-history.component.html',
  styleUrls: ['./show-history.component.scss']
})

export class ShowHistoryComponent implements OnInit {
  histories: any[] = [];
  expandedId: number | null = null;

  constructor(private historyService: HistoryService) {}

  ngOnInit(): void {
    this.historyService.getHistories().subscribe(data => {
      this.histories = data;
    });
  }

  toggleExpand(id: number): void {
    this.expandedId = this.expandedId === id ? null : id;
  }
}
