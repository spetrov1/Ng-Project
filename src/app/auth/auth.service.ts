import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";

interface AuthenticationResponse {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable()
export class AuthService {

    readonly firebaseSingUpUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAbt7Yh4Ln-xBvthdtGWnJvOCkxmK39pok";
    readonly firebaseLoginUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAbt7Yh4Ln-xBvthdtGWnJvOCkxmK39pok";

    constructor(private http: HttpClient) {}

    signUp(sentEmail: string, sentPassword: string) {
        return this.http.post<AuthenticationResponse>(this.firebaseSingUpUrl,
            {
                email: sentEmail,
                password: sentPassword,
                returnSecureToken: true
            }).pipe(
                catchError(this.handleError)
            );
    }

    login(sentEmail: string, sentPassword: string) {
        return this.http.post<AuthenticationResponse>(this.firebaseLoginUrl,
            {
                email: sentEmail,
                password: sentPassword,
                returnSecureToken: true
            }).pipe(
                catchError(this.handleError)
            );
    }

    private handleError(error: HttpErrorResponse) {
        let errorMsg;
        console.log("Raw error", error);

        switch(error.error.error.message) {
            case "EMAIL_EXISTS": errorMsg = "Inputed email already exists"; break;
            case "EMAIL_NOT_FOUND": errorMsg = "Inputed email is not existing"; break;
            case "INVALID_PASSWORD": errorMsg = "Inputed password is not existing"; break;
            case "USER_DISABLED": errorMsg = "User is disabled"; break;
            default: errorMsg = error.error.error.message;
        }

        return throwError(errorMsg);
    }

}
