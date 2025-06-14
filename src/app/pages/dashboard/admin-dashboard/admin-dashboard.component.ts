// admin-dashboard.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransportViewComponent } from '../../add-product/add-transport/transport-view/transport-view.component';
import { HeaderComponent } from "../../../components/header/header.component";
import { AddBannerSlideComponent } from "../../add-product/add-bannerslide/add-banner-slide.component";
import { AddStoryComponent } from "../../add-product/add-story/add-story.component";
import { AddAlbomComponent } from "../../add-product/add-albom/add-albom.component";

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, TransportViewComponent, HeaderComponent, AddBannerSlideComponent, AddStoryComponent, AddAlbomComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {
  activeTab: string = 'transport';

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
}