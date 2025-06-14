import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() mobileMenuToggled = new EventEmitter<boolean>(); // ✅ დამატება

  notificationCount = 105;
  heartCount = 27;
  isHeaderHidden = false;
  mobileMenuOpen = false;

  private lastScroll = 0;

  constructor(
    public authService: AuthService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  @HostListener('window:scroll')
  onScroll(): void {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    this.isHeaderHidden = currentScroll > this.lastScroll && currentScroll > 100;
    this.lastScroll = currentScroll;
  }

  showHeaderOnHover(): void {
    this.isHeaderHidden = false;
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    const header = document.querySelector('.header');
    if (header) {
      header.classList.toggle('mobile-menu-expanded', this.mobileMenuOpen);
    }

    // ✅ ინფორმაციის გაგზავნა მშობელ კომპონენტში
    this.mobileMenuToggled.emit(this.mobileMenuOpen);
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
    const header = document.querySelector('.header');
    header?.classList.remove('mobile-menu-expanded');
    this.mobileMenuToggled.emit(false); // იძულებით false
  }

  logout(): void {
    this.authService.logout();
  }

  getStyledTitle(text: string): string {
    return text
      .split('')
      .map((char, index) =>
        index % 2 === 1 ? `<span class="styled-letter">${char.toUpperCase()}</span>` : char
      )
      .join('');
  }

  menuItems = [
    { path: '/dashboard', label: 'მთავარი' },
    { path: '/News', label: 'სიახლეები' },
    //{ path: '/gallery', label: 'გალერეა' },
    { path: '/about', label: 'ჩვენს შესახებ' },
    { path: '/contact', label: 'კონტაქტი' }
  ];

  isLoginPage(): boolean {
    return this.router.url === '/login';
  }

  isOnDashboard(): boolean {
    return this.router.url === '/dashboard';
  }
}
