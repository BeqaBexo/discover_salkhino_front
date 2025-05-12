import { Component } from '@angular/core';
import { ShowMaranComponent } from "./show-maran/show-maran.component";
import { HeaderComponent } from "../../../components/header/header.component";

@Component({
  selector: 'app-maran-detail',
  standalone: true,
  imports: [ShowMaranComponent, HeaderComponent],
  templateUrl: './maran-detail.component.html',
  styleUrl: './maran-detail.component.scss'
})
export class MaranDetailComponent {

}
