import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login({ username: this.username, password: this.password }).subscribe({
      next: (res) => {
        this.authService.storeToken(res.token);
        this.errorMessage = '';
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.errorMessage = 'მომხმარებელი ან პაროლი არასწორია!';
      }
    });
  }
}