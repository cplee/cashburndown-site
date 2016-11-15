import {Component} from '@angular/core';
import {ProgressService} from "../util/progress.service";

@Component({
    selector: 'burndown',
    templateUrl: './burndown.component.html',
})
export class BurndownComponent {

    constructor(
      private progress: ProgressService
    ) {
    }

    ngOnInit(): void {
    };

}
