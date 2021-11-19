import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";

interface AuthenticationResponse {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
}

@Injectable()
export class AuthService {

    readonly firebaseAuthApiUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAbt7Yh4Ln-xBvthdtGWnJvOCkxmK39pok";


    constructor(private http: HttpClient) {}

    signUp(sentEmail: string, sentPassword: string) {
        return this.http.post<AuthenticationResponse>(this.firebaseAuthApiUrl,
            {
                email: sentEmail,
                password: sentPassword,
                returnSecureToken: true
            }).pipe(
                catchError(
                    error => {
                        let errorMsg;
                        console.log("Raw error", error);

                        switch(error.error.error.message) {
                            case "EMAIL_EXISTS": errorMsg = "Inputed email already exists";
                            default: errorMsg = error.error.error.message;
                        }

                        return throwError(errorMsg);
                    }
                )
            );
    }

}
