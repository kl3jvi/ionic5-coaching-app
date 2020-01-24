import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Facebook } from '@ionic-native/facebook/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import * as firebase from 'firebase/app';
import { Observable, of } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';
import { IUser } from '../../../shared/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user$: Observable<IUser>;
  public user: IUser;

  constructor(
    public _afAuth: AngularFireAuth,
    private _afs: AngularFirestore,
    private _router: Router,
    private _fb: Facebook,
    private _google: GooglePlus
  ) {
    this.user$ = _afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this._afs.doc<any>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
    this.user$.subscribe((user: IUser) => (this.user = user));
  }

  public getUser() {
    return this.user$.pipe(first()).toPromise();
  }

  public signInWithEmail(credentials) {
    console.log('Sign in with email');
    return this._afAuth.auth.signInWithEmailAndPassword(
      credentials.email,
      credentials.password
    );
  }

  public async signUp(credentials: {
    fullname: any;
    email: any;
    password: any;
    rpassword?: string;
  }) {
    const credential = await this._afAuth.auth.createUserWithEmailAndPassword(
      credentials.email,
      credentials.password
    );
    await credential.user.updateProfile({
      displayName: credentials.fullname,
      photoURL: null
    });
    return this.updateUserData(credential.user);
  }

  public async signOut() {
    await this._afAuth.auth.signOut();
    return this._router.navigate(['']);
  }

  public async signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    if ((window as any).cordova) {
      return this._google.login(['public_profile']).then(
        (response) => {
          const googleCredential = firebase.auth.GoogleAuthProvider.credential(
            response.authResponse.accessToken
          );
          return firebase
            .auth()
            .signInWithCredential(googleCredential)
            .then((credential) => this.updateUserData(credential.user));
        },
        (err) => {}
      );
    } else {
      const credential = await this._afAuth.auth.signInWithPopup(provider);
      return this.updateUserData(credential.user);
    }
  }

  public async signInWithFacebook() {
    const provider = new firebase.auth.FacebookAuthProvider();
    if ((window as any).cordova) {
      return this._fb.login(['public_profile']).then(
        (response) => {
          const facebookCredential = firebase.auth.FacebookAuthProvider.credential(
            response.authResponse.accessToken
          );
          return firebase
            .auth()
            .signInWithCredential(facebookCredential)
            .then((credential) => this.updateUserData(credential.user));
        },
        (err) => {}
      );
    } else {
      const credential = await this._afAuth.auth.signInWithPopup(provider);
      return this.updateUserData(credential.user);
    }
  }

  public confirmPasswordReset(code, password): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this._afAuth.auth.confirmPasswordReset(code, password);
    });
  }

  public updateUserData(user) {
    const userRef: AngularFirestoreDocument<IUser> = this._afs.doc<IUser>(
      `users/${user.uid}`
    );
    const data: IUser = {
      fullname: user.displayName,
      email: user.email,
      phone: user.phoneNumber,
      profileImage: user.photoURL,
      lastLoginAt: new Date().toISOString(),
      uid: user.uid
    };
    return userRef.set(data, { merge: true });
  }

  private oauthSignIn(provider) {
    if (!(window as any).cordova) {
      return this._afAuth.auth.signInWithPopup(provider);
    } else {
      return this._afAuth.auth.signInWithRedirect(provider).then(() => {
        return this._afAuth.auth
          .getRedirectResult()
          .then((result) => {
            // This gives you a Google Access Token.
            // You can use it to access the Google API.
            // const token = result.user.credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            console.log(user);
          })
          .catch((error) => {
            // Handle Errors here.
            alert(error.message);
          });
      });
    }
  }
}
