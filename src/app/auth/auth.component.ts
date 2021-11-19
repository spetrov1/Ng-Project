import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
    selector: "auth",
    templateUrl: "./auth.component.html"
})
export class AuthComponent {
    loginMode: boolean = false;

    switchMode() {
        this.loginMode = !this.loginMode;
    }

    onSubmit(authForm: NgForm) {
        console.log(authForm.value);
    }

}