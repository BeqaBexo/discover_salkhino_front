import { Component } from '@angular/core';
import { ShowPlaceComponent } from './show-place/show-place.component';
import { HeaderComponent } from "../../../components/header/header.component";

@Component({
  selector: 'app-place-detail',
  standalone: true,
  imports: [ShowPlaceComponent, HeaderComponent],
  templateUrl: './place-detail.component.html',
  styleUrl: './place-detail.component.scss'
})
export class PlaceDetailComponent {

}
