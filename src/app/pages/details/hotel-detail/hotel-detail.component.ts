import { Component } from '@angular/core';
import { HeaderComponent } from "../../../components/header/header.component";
import { ShowHotelComponent } from "./show-hotel/show-hotel.component";

@Component({
  selector: 'app-hotel-detail',
  standalone: true,
  imports: [HeaderComponent, ShowHotelComponent],
  templateUrl: './hotel-detail.component.html',
  styleUrl: './hotel-detail.component.scss'
})
export class HotelDetailComponent {

}
