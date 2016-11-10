import { Component } from '@angular/core';
import {ProgressService} from "./progress.service";
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent {
    title = 'Cashburndown';
    constructor(private progress: ProgressService) {}

}
