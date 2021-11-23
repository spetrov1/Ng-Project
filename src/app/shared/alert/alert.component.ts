import { Input, Output, EventEmitter, Component  } from "@angular/core";

@Component({
    selector: "alert",
    templateUrl: "./alert.component.html",
    styleUrls: ["./alert.component.css"]
})
export class AlertComponent {
    @Input() message;
    @Output() close = new EventEmitter<void>();

    onClose() {
        this.close.emit();
    }
}