import { Component } from '@angular/core';
import { HeaderComponent } from "../../../components/header/header.component";
import { ShowToureComponent } from "./show-toure/show-toure.component";

@Component({
  selector: 'app-toure-detail',
  standalone: true,
  imports: [HeaderComponent, ShowToureComponent],
  templateUrl: './toure-detail.component.html',
  styleUrl: './toure-detail.component.scss'
})
export class ToureDetailComponent {

}
