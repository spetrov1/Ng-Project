import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert.component";
import { DropdownDirective } from "./dropdown.directive";
import { LoadingSpinner } from "./loading-spinner/loading-spinner.component";


@NgModule({
    declarations: [
        LoadingSpinner,
        AlertComponent,
        DropdownDirective
    ],
    exports: [
        DropdownDirective,
        AlertComponent,
        LoadingSpinner
    ]
})
export class SharedModule {

}