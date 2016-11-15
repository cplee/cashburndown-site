import { Component } from '@angular/core';
import {ProgressService} from "./util/progress.service";
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent {
    title = 'Cashburndown';
    constructor(private progress: ProgressService) {}
}
