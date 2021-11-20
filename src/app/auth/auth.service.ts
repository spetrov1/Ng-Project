import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, throwError } from "rxjs";
import { catchError, tap, take } from "rxjs/operators";
import { User } from "./user/User";

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
    userCreation = new BehaviorSubject<User>(null);
    tokenExpirationTimer = null;

    constructor(private http: HttpClient,
        private router: Router) {}

    signUp(sentEmail: string, sentPassword: string) {
        return this.http.post<AuthenticationResponse>(this.firebaseSingUpUrl,
            {
                email: sentEmail,
                password: sentPassword,
                returnSecureToken: true
            }).pipe(
                catchError(this.handleError),
                tap(this.handleAuthentication)
            );
    }

    login(sentEmail: string, sentPassword: string) {
        return this.http.post<AuthenticationResponse>(this.firebaseLoginUrl,
            {
                email: sentEmail,
                password: sentPassword,
                returnSecureToken: true
            }).pipe(
                catchError(this.handleError),
                tap(this.handleAuthentication.bind(this))
            );
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMsg;
        console.log("Raw error", errorRes);

        switch(errorRes.error.error.message) {
            case "EMAIL_EXISTS": errorMsg = "Inputed email already exists"; break;
            case "EMAIL_NOT_FOUND": errorMsg = "Inputed email is not existing"; break;
            case "INVALID_PASSWORD": errorMsg = "Inputed password is not existing"; break;
            case "USER_DISABLED": errorMsg = "User is disabled"; break;
            default: errorMsg = errorRes.error.error.message;
        }

        return throwError(errorMsg);
    }

    private handleAuthentication(response: AuthenticationResponse) {        
        const expirationDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
        const user = new User(response.email, 
            response.localId, 
            response.idToken,
            expirationDate);

        // console.log("test", user, response);
        this.userCreation.next(user);

        localStorage.setItem("userData", JSON.stringify(user));

        this.autoLogout(+response.expiresIn * 1000);

        // this.userCreation.pipe(take(1)).subscribe(response => console.log("take2: ", response));
    }

    logout() {
        this.userCreation.next(null);
        this.router.navigate(["/auth"]);
        localStorage.removeItem("userData");

        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }

        this.tokenExpirationTimer = null;
    }

    autoLogin() {

        if (!localStorage.getItem("userData")) {
            return;
        }

        const user: {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem("userData"));
        console.log("test", user);

        const loadedUser = new User(user.email,
            user.id,
            user._token,
            new Date(user._tokenExpirationDate));

        if (loadedUser.token) {
            this.userCreation.next(loadedUser);
        }

    }

    autoLogout(expirationTime) {
        this.tokenExpirationTimer = setTimeout(this.logout.bind(this), expirationTime);
    }

}
