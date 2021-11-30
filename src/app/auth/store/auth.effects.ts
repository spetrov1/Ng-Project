import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as AuthActions from '../store/auth.actions';
import { User } from '../user/User';

interface AuthenticationResponse {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
    // just to work for now
    type;
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
                    map( (response) => {
                        const expirationDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
                        const user = new User(
                            response.email, 
                            response.localId, 
                            response.idToken,
                            expirationDate);

                        return new AuthActions.LoginSuccess(user);
                    })
                    //,
                    // catchError( (errorRes: HttpErrorResponse) => {
                    //     let errorMsg;

                    //     switch(errorRes.error.error.message) {
                    //         case "EMAIL_EXISTS": errorMsg = "Inputed email already exists"; break;
                    //         case "EMAIL_NOT_FOUND": errorMsg = "Inputed email is not existing"; break;
                    //         case "INVALID_PASSWORD": errorMsg = "Inputed password is not existing"; break;
                    //         case "USER_DISABLED": errorMsg = "User is disabled"; break;
                    //         default: errorMsg = errorRes.error.error.message;
                    //     }

                    //     return new AuthActions.LoginFail('hello');
                    // })
                );

            }
        )
        )
    );


    constructor(private actions$: Actions, private http: HttpClient) {}
}