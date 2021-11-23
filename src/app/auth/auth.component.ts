import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Component({
    selector: "auth",
    templateUrl: "./auth.component.html"
})
export class AuthComponent {
    loginMode: boolean = false;
    isLoading = false;
    errorMsg: string = null;

    constructor(private authService: AuthService) {}

    switchMode() {
        this.loginMode = !this.loginMode;
    }

    onSubmit(authForm: NgForm) {
        const email = authForm.value.email;
        const password = authForm.value.password;
        let serverResponse = null;

        this.isLoading = true;

        if (this.loginMode) {
            serverResponse = this.authService.login(email, password);
        }
        else {
            serverResponse = this.authService.signUp(email, password);
        }

        this.handleServerResponse(serverResponse);
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