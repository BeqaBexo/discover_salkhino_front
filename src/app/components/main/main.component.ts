import { Component } from '@angular/core';
import { HotelComponent } from "./hotel/hotel.component";
import { TourComponent } from './tour/tour.component';
import { MaranComponent } from "./maran/maran.component";
import { TransportComponent } from "./transport/transport.component";
import { MapComponent } from "./map/map.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [MaranComponent, MapComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
