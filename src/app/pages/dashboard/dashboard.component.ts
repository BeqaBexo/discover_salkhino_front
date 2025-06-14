import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { LeftSideComponent } from '../../components/left-side/left-side.component';
import { RightSideComponent } from '../../components/right-side/right-side.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { MainComponent } from '../../components/main/main.component';
import { RouterModule } from '@angular/router';
import { CatalogComponent } from '../../components/main/catalog/catalog.component';
import { BannerComponent } from '../../components/main/banner/banner.component';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    LeftSideComponent,
    RightSideComponent,
    MainComponent,
    RouterModule,
    CatalogComponent,
    BannerComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {


}
