import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
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
    
        this.isLoading = true;

        if (this.loginMode) {

        }
        else {
            this.authService.signUp(email, password).subscribe(
                responseData => {
                    console.log(responseData);
                    this.isLoading = false;
                },
                errorMsg => {
                    this.isLoading = false;
                    this.errorMsg = errorMsg;
                }
            );
        }
    }

}