import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStateChange, FirebaseAuthentication, User } from '@capacitor-firebase/authentication';
import { Platform } from '@ionic/angular';
import { initializeApp } from 'firebase/app';
import { BehaviorSubject, from, lastValueFrom, Observable, take } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser$ = new BehaviorSubject<User | null>(null);

  // DI
  private router = inject(Router);
  private platform = inject(Platform);

  constructor() {
    FirebaseAuthentication.removeAllListeners().then(() => {
      FirebaseAuthentication.addListener('authStateChange', (authState: AuthStateChange) => {
        this.currentUser$.next(authState.user);
      });
    });
    // Only needed to support dev livereload.
    FirebaseAuthentication.getCurrentUser().then((authState: AuthStateChange) => {
      .0
      this.currentUser$.next(authState.user);
    });
  }

  initAuthListener() {
    if (this.platform.is('capacitor')) {
      return;
    }
    /**
     * Only needed if the Firebase JavaScript SDK is used.
     *
     * Read more: https://github.com/robingenz/capacitor-firebase/blob/main/packages/authentication/docs/firebase-js-sdk.md
     */
    initializeApp(environment.firebase);
  }

  getCurrentUser(): Promise<User | null> {
    return lastValueFrom(this.currentUser$.pipe(take(1)));
  }

  async signIn(): Promise<void> {
    await FirebaseAuthentication.signInWithGoogle({ scopes: ['profile', 'email'] }).then(result => {
      this.router.navigate(['/']);
    });
  }

  signOut(): Observable<boolean> {
    return from(FirebaseAuthentication.signOut().then(() => this.router.navigate(['/auth/login'])));
  }
}
