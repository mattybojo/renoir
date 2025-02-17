import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStateChange, FirebaseAuthentication, User } from '@capacitor-firebase/authentication';
import { QueryCompositeFilterConstraint, QueryFilterConstraint } from '@capacitor-firebase/firestore';
import { Platform } from '@ionic/angular';
import { initializeApp } from 'firebase/app';
import { flatten } from 'lodash';
import { from, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { USER_GROUPS } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser = signal<User | null>(null);

  whereCurrentUserIsOwner!: QueryFilterConstraint;
  whereSharedWithCurrentUser!: QueryFilterConstraint;
  whereCurrentUserIsAllowed!: QueryCompositeFilterConstraint;

  // DI
  private router = inject(Router);
  private platform = inject(Platform);

  constructor() {
    FirebaseAuthentication.removeAllListeners().then(() => {
      FirebaseAuthentication.addListener('authStateChange', (authState: AuthStateChange) => {
        this.currentUser.set(authState.user);
        this.whereCurrentUserIsOwner = {
          type: 'where',
          fieldPath: 'uid',
          opStr: '==',
          value: authState.user?.uid,
        };

        this.whereSharedWithCurrentUser = {
          type: 'where',
          fieldPath: 'sharedWith',
          opStr: 'array-contains',
          value: authState.user?.uid,
        };

        this.whereCurrentUserIsAllowed = {
          type: 'or',
          queryConstraints: [
            this.whereCurrentUserIsAllowed,
            this.whereCurrentUserIsOwner
          ]
        };
      });
    });
    // Only needed to support dev livereload.
    FirebaseAuthentication.getCurrentUser().then((authState: AuthStateChange) => {
      this.currentUser.set(authState.user);
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

  getSharedWith(): string[] {
    return flatten(USER_GROUPS.filter((val: string[]) => val.includes(this.currentUser()!.uid)));
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
