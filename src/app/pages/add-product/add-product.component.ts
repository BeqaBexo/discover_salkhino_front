import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from "../../components/header/header.component";
import { AddService } from './add-product-service/add-service.service';
import { Forum } from './add-product-service/add-service.model';
import { AddTransportComponent } from "./add-transport/add-transport.component";
import { AddForumComponent } from "./add-forum/add-forum.component";
import { AddAlbomComponent } from './add-albom/add-albom.component';
import { AddHistoryComponent } from "./add-history/add-history.component";
import { AddMaranComponent } from "./add-maran/add-maran.component";
import { AddStoryComponent } from "./add-story/add-story.component";
import { HotelComponent } from "../../components/main/hotel/hotel.component";
import { AddHotelComponent } from "./add-hotel/add-hotel.component";
import { AddBannerSlideComponent } from "./add-bannerslide/add-banner-slide.component";




@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HeaderComponent, AddTransportComponent, AddForumComponent, AddAlbomComponent, AddHistoryComponent, AddMaranComponent, AddStoryComponent, AddHotelComponent, AddBannerSlideComponent],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent {
  activeTab: string = 'transport'; // Default tab

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
}