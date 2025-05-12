// ✅ src/app/services/auth/auth.service.ts
import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, timer, Subscription } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'https://localhost:7237/api/auth';
  private inactivityTimeout = 3 * 60 * 1000; // 3 minutes
  private inactivityTimer?: Subscription;

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Commented out to disable auto logout on user inactivity
    // if (isPlatformBrowser(this.platformId)) {
    //   this.resetInactivityTimer();
    // }
  }

  login(credentials: { username: string; password: string }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.baseUrl}/login`, credentials);
  }

  storeToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
      // this.resetInactivityTimer();
    }
  }

  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
    this.stopInactivityTimer();
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const role = payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      return role?.toLowerCase() === 'admin';
    } catch (e) {
      console.error('Invalid token structure', e);
      return false;
    }
  }

  // Commented out to avoid performance issues
  // resetInactivityTimer(): void {
  //   if (!isPlatformBrowser(this.platformId)) return;

  //   this.stopInactivityTimer();
  //   this.inactivityTimer = timer(this.inactivityTimeout).subscribe(() => this.logout());

  //   window.removeEventListener('mousemove', this.resetInactivityTimer);
  //   window.removeEventListener('keydown', this.resetInactivityTimer);

  //   window.addEventListener('mousemove', () => this.resetInactivityTimer(), { once: true });
  //   window.addEventListener('keydown', () => this.resetInactivityTimer(), { once: true });
  // }

  private stopInactivityTimer(): void {
    this.inactivityTimer?.unsubscribe();
  }
}