import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule]
})
export class LoginPage {

  private authService = inject(AuthService);

  constructor() { }

  signIn(): void {
    this.authService.signIn();
  }
}
