import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { dispatch } from 'rxjs/internal/observable/pairs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import * as AuthActions from '../store/auth.actions';
import { User } from '../user/User';

interface AuthenticationResponse {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable()
export class AuthEffects {

    readonly firebaseLoginUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAbt7Yh4Ln-xBvthdtGWnJvOCkxmK39pok";

    authLogin$ = createEffect(
        () => this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap( (authData: AuthActions.LoginStart) => {
            return this.http.post<AuthenticationResponse>(this.firebaseLoginUrl,
                {
                    email: authData.payload.email,
                    password: authData.payload.password,
                    returnSecureToken: true
                })
                .pipe(
                    map( (response: AuthenticationResponse) => {
                        const expirationDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
                        const user = new User(
                            response.email, 
                            response.localId, 
                            response.idToken,
                            expirationDate);

                        return new AuthActions.LoginSuccess(user);
                    })
                    ,
                    catchError( errorRes => {
                        let errorMsg;

                        switch(errorRes.error.error.message) {
                            case "EMAIL_EXISTS": errorMsg = "Inputed email already exists"; break;
                            case "EMAIL_NOT_FOUND": errorMsg = "Inputed email is not existing"; break;
                            case "INVALID_PASSWORD": errorMsg = "Inputed password is not existing"; break;
                            case "USER_DISABLED": errorMsg = "User is disabled"; break;
                            default: errorMsg = errorRes.error.error.message;
                        }

                        return of(new AuthActions.LoginFail(errorMsg));
                    })
                );

            }
        )
        )
    );

    // Option 1
    // @Effect({dispatch: false})
    // authSuccess$ = this.actions$.pipe(
    //         ofType(AuthActions.LOGIN_SUCCESS),
    //         tap(() => this.router.navigate(["/shopping-list"]))
    // );

    // Option 2 - Maybe better one
    authSuccess$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(AuthActions.LOGIN_SUCCESS),
                tap(() => this.router.navigate(['/shopping-list']))
            );
            },
            {dispatch: false}
    );
    

    constructor(
        private actions$: Actions, 
        private http: HttpClient,
        private router: Router) {}
}