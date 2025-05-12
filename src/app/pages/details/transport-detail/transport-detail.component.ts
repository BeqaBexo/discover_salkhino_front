import { Component } from '@angular/core';
import { HeaderComponent } from "../../../components/header/header.component";
import { Searchtransportomponent } from "./search-transport/search-transport.component";

@Component({
  selector: 'app-transport-detail',
  standalone: true,
  imports: [HeaderComponent, Searchtransportomponent],
  templateUrl: './transport-detail.component.html',
  styleUrl: './transport-detail.component.scss'
})
export class TransportDetailComponent {

  

}
