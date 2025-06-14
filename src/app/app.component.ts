import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, HeaderComponent, CommonModule, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isMobileMenuOpen = false;

  @HostListener('window:click', ['$event'])
  onWindowClick(event: Event): void {
    const header = document.querySelector('header');
    this.isMobileMenuOpen = header?.classList.contains('mobile-menu-expanded') || false;
  }

  onMobileMenuToggled(open: boolean): void {
    this.isMobileMenuOpen = open;
  }
}
