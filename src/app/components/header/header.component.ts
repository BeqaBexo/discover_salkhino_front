// ✅ src/app/components/header/header.component.ts
import { Component } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  notificationCount = 0;
  heartCount = 0;

  constructor(
    public authService: AuthService, 
    private router: Router,
    private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.notificationCount = 105;
    this.heartCount = 27;
  }

  isLoginPage(): boolean {
  return this.router.url === '/login';
}


menuItems = [
  { path: '/dashboard', label: 'მთავარი' },
  { path: '/ჩვენს-შესახებ', label: 'ჩვენს შესახებ' },
  { path: '/კონტაქტი', label: 'კონტაქტი' }
];

getStyledTitle(text: string): string {
  return text
    .split('')
    .map((char, index) =>
      index % 2 === 1 ? `<span class="styled-letter">${char.toUpperCase()}</span>` : char
    )
    .join('');
}


  getRouterLink(serviceTitle: string): string {
    return '/' + serviceTitle.toLowerCase().replace(' ', '-');
  }

  isOnDashboard(): boolean {
    return this.router.url === '/dashboard';
  }

  logout(): void {
    this.authService.logout();
  }
}
