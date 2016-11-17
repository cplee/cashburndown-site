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
    burndownTypes: string[];

    constructor(
      private progress: ProgressService,
      private burndownService: BurndownService
    ) {
      this.type = BurndownType.Paycheck;
      this.asofdate = new Date();
      this.burndownTypes = [
        BurndownType[BurndownType.Year],
        BurndownType[BurndownType.Month],
        BurndownType[BurndownType.Paycheck]
      ];
    }

    ngOnInit(): void {
      this.getBurndown();
    };

    getBurndown(): void {
        this.progress.loading = true;
        console.log(this.asofdate);
        this.burndownService
          .getBurndown(this.type, this.asofdate)
          .then(burndown => {
            this.progress.loading = false;
            this.burndown = burndown;
          })
          .catch(e => this.progress.alertError(e));
    };

    previousBurndown(): void {
      this.asofdate = new Date(this.burndown.startDate);
      this.asofdate.setDate(this.asofdate.getDate()-1);
      this.getBurndown();
    };

    nextBurndown(): void {
      this.asofdate = new Date(this.burndown.endDate);
      this.asofdate.setDate(this.asofdate.getDate()+1);
      this.getBurndown();
    };

}
