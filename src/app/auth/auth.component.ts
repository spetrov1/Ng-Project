import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';

@Component({
    selector: "auth",
    templateUrl: "./auth.component.html"
})
export class AuthComponent implements OnInit {
    loginMode: boolean = false;
    isLoading = false;
    errorMsg: string = null;

    constructor(private authService: AuthService,
        private store: Store<fromApp.AppState>) {}

    ngOnInit() {
        this.store.select('auth').subscribe(
            authState => {
                this.isLoading = authState.loading;
                this.errorMsg = authState.authError;
            }
        );
    }

    switchMode() {
        this.loginMode = !this.loginMode;
    }

    onSubmit(authForm: NgForm) {
        const email = authForm.value.email;
        const password = authForm.value.password;
        let serverResponse = null;

        this.isLoading = true;

        if (this.loginMode) {
            // serverResponse = this.authService.login(email, password);
            this.store.dispatch(new AuthActions.LoginStart({ email: email, password: password }));
        }
        else {
            serverResponse = this.authService.signUp(email, password);
        }

        // this.handleServerResponse(serverResponse);
    }

    private handleServerResponse(response: Observable<any>) {
        response.subscribe(
            responseData => {
                console.log(responseData);
                this.isLoading = false;
                this.errorMsg = null;
            },
            errorMsg => {
                this.isLoading = false;
                this.errorMsg = errorMsg;
            }
        );
    }

    onCloseAlert() {
        this.errorMsg = null;
    }

}