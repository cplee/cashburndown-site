import {Component} from '@angular/core';
import {ProgressService} from "../util/progress.service";
import {BurndownService} from "./burndown.service";
import {BurndownType} from "../accounts/account";
import {Burndown} from "./burndown";

@Component({
    selector: 'burndown',
    templateUrl: './burndown.component.html',
})
export class BurndownComponent {
    burndown: Burndown;
    type: BurndownType;
    asofdate: Date;

    constructor(
      private progress: ProgressService,
      private burndownService: BurndownService
    ) {
      this.type = BurndownType.Paycheck;
      this.asofdate = new Date();
    }

    ngOnInit(): void {
      this.getBurndown();
    };

    getBurndown(): void {
        this.progress.loading = true;
        this.burndownService
          .getBurndown(this.type, this.asofdate)
          .then(burndown => {
            this.progress.loading = false;
            this.burndown = burndown;
          })
          .catch(e => this.progress.alertError(e));
    };

}
